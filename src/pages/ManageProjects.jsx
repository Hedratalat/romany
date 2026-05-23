import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

const categories = ["Video Editing", "Cinematography", "Motion Graphics"];
const spanOptions = ["Normal", "Wide (col-span-2)"];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  // ── Real-time listener ──
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "projects"), (snap) => {
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // ── Delete ──
  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteDoc(doc(db, "projects", deleteTarget.id));
    setDeleteTarget(null);
  };

  // ── Edit ──
  const openEdit = (p) => {
    setEditTarget(p);
    setEditForm({
      title: p.title,
      client: p.client,
      year: p.year,
      duration: p.duration,
      category: p.category,
      span: p.span === "col-span-2" ? "Wide (col-span-2)" : "Normal",
      desc: p.desc,
      thumb: p.thumb,
      videoUrl: p.videoUrl || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    if (!editTarget) return;
    setSaving(true);
    await updateDoc(doc(db, "projects", editTarget.id), {
      ...editForm,
      span: editForm.span === "Wide (col-span-2)" ? "col-span-2" : "",
    });
    setSaving(false);
    setEditTarget(null);
  };

  return (
    <div className="min-h-screen bg-hero px-4 sm:px-8 py-10">
      {/* Header */}
      <motion.div
        className="mb-10"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0.05}
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-8 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <span className="font-inter text-2xs tracking-widest-4 uppercase text-gold">
            Dashboard
          </span>
        </div>
        <h2
          className="font-cormorant font-light text-white leading-none"
          style={{ fontSize: "clamp(32px,4vw,56px)" }}
        >
          Manage{" "}
          <em className="not-italic bg-gradient-to-r from-gold via-gold-light to-gold-dark bg-[length:300%_100%] bg-clip-text text-transparent animate-shimmer">
            Projects
          </em>
        </h2>
      </motion.div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-3 text-gold/50">
          <span className="w-3 h-3 rounded-full border border-gold/40 border-t-gold animate-spin" />
          <span className="font-inter text-2xs uppercase tracking-widest-3">
            Loading...
          </span>
        </div>
      )}

      {/* Projects List */}
      {!loading && projects.length === 0 && (
        <p className="font-inter text-xs text-gold/40 tracking-widest-2">
          No projects found.
        </p>
      )}

      <div className="flex flex-col gap-4 max-w-4xl">
        <AnimatePresence>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              variants={fadeUp}
              custom={i * 0.05}
              className="flex flex-col sm:flex-row gap-4 border-0.5 border-gold/20 bg-gold/[0.03] rounded-2xl p-4 sm:p-5 hover:border-gold/40 transition-all duration-300"
            >
              {/* Thumb */}
              {p.thumb && (
                <img
                  src={p.thumb}
                  alt={p.title}
                  className="w-full sm:w-32 h-20 object-cover rounded-xl flex-shrink-0"
                  style={{ filter: "brightness(0.75)" }}
                />
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <span className="font-cormorant text-lg text-white leading-none">
                    {p.title}
                  </span>
                  <span className="font-inter text-2xs uppercase tracking-widest-2 text-gold/50 border-0.5 border-gold/20 px-2 py-0.5 rounded-full">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-2">
                  <span className="font-inter text-2xs text-gold/60">
                    {p.client}
                  </span>
                  <span className="font-inter text-2xs text-gold/30">
                    {p.year}
                  </span>
                  {p.duration && (
                    <span className="font-inter text-2xs text-gold/30">
                      {p.duration}
                    </span>
                  )}
                </div>
                <p className="font-inter text-xs text-white/30 leading-relaxed line-clamp-2">
                  {p.desc}
                </p>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col gap-2 flex-shrink-0 justify-end">
                <button
                  onClick={() => openEdit(p)}
                  className="font-inter text-2xs uppercase tracking-widest-2 text-gold border-0.5 border-gold/30 px-4 py-1.5 rounded-full hover:bg-gold/10 hover:border-gold transition-all duration-200 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(p)}
                  className="font-inter text-2xs uppercase tracking-widest-2 text-red-400/70 border-0.5 border-red-400/20 px-4 py-1.5 rounded-full hover:bg-red-400/10 hover:border-red-400/50 transition-all duration-200 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Delete Confirm Popup ── */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteTarget(null)}
          >
            <div className="absolute inset-0 bg-hero/90 backdrop-blur-md" />
            <motion.div
              className="relative z-10 w-full max-w-sm border-0.5 border-gold/20 bg-hero rounded-2xl p-7 flex flex-col gap-5"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-400/70 mx-auto" />
              <div className="text-center">
                <h3 className="font-cormorant text-2xl font-light text-white mb-1">
                  Delete Project?
                </h3>
                <p className="font-inter text-xs text-white/35 leading-relaxed">
                  "{deleteTarget.title}" will be permanently removed.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 font-inter text-2xs uppercase tracking-widest-2 text-gold/60 border-0.5 border-gold/20 py-2.5 rounded-full hover:border-gold/40 transition-all duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 font-inter text-2xs uppercase tracking-widest-2 text-red-400 border-0.5 border-red-400/30 py-2.5 rounded-full hover:bg-red-400/10 hover:border-red-400/60 transition-all duration-200 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Edit Popup ── */}
      <AnimatePresence>
        {editTarget && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditTarget(null)}
          >
            <div className="absolute inset-0 bg-hero/90 backdrop-blur-md" />
            <motion.div
              className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto border-0.5 border-gold/20 bg-hero rounded-2xl p-6 flex flex-col gap-5"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-cormorant text-2xl font-light text-white">
                Edit{" "}
                <em className="not-italic bg-gradient-to-r from-gold via-gold-light to-gold-dark bg-[length:300%_100%] bg-clip-text text-transparent animate-shimmer">
                  Project
                </em>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EField
                  label="Title"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                />
                <EField
                  label="Client"
                  name="client"
                  value={editForm.client}
                  onChange={handleEditChange}
                />
                <EField
                  label="Year"
                  name="year"
                  value={editForm.year}
                  onChange={handleEditChange}
                />
                <EField
                  label="Duration"
                  name="duration"
                  value={editForm.duration}
                  onChange={handleEditChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ESelect
                  label="Category"
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  options={categories}
                />
                <ESelect
                  label="Grid Size"
                  name="span"
                  value={editForm.span}
                  onChange={handleEditChange}
                  options={spanOptions}
                />
              </div>

              <EField
                label="Thumbnail URL"
                name="thumb"
                value={editForm.thumb}
                onChange={handleEditChange}
              />
              <EField
                label="Video URL"
                name="videoUrl"
                value={editForm.videoUrl}
                onChange={handleEditChange}
              />

              <div className="flex flex-col gap-2">
                <label className="font-inter text-2xs tracking-widest-3 uppercase text-gold">
                  Description
                </label>
                <textarea
                  name="desc"
                  value={editForm.desc}
                  onChange={handleEditChange}
                  rows={3}
                  className="bg-gold/[0.03] border-0.5 border-gold/20 rounded-xl px-4 py-3 font-inter text-xs text-gold placeholder:text-gold/30 outline-none focus:border-gold transition-colors duration-200 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditTarget(null)}
                  className="flex-1 font-inter text-2xs uppercase tracking-widest-2 text-gold/60 border-0.5 border-gold/20 py-2.5 rounded-full hover:border-gold/40 transition-all duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 font-inter text-2xs uppercase tracking-widest-2 text-gold border-0.5 border-gold/30 py-2.5 rounded-full hover:bg-gold/10 hover:border-gold transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <span className="w-3 h-3 rounded-full border border-gold/40 border-t-gold animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Edit Field ───────────────────────────────────────────────
function EField({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-inter text-2xs tracking-widest-3 uppercase text-gold">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gold/[0.03] border-0.5 border-gold/20 rounded-xl px-4 py-3 font-inter text-xs text-gold outline-none focus:border-gold transition-colors duration-200"
      />
    </div>
  );
}

// ── Edit Select ──────────────────────────────────────────────
function ESelect({ label, name, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-inter text-2xs tracking-widest-3 uppercase text-gold">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gold/[0.03] border-0.5 border-gold/20 rounded-xl px-4 py-3 font-inter text-xs text-gold outline-none focus:border-gold transition-colors duration-200 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-hero text-white">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
