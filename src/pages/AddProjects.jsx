import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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

const initialForm = {
  title: "",
  client: "",
  year: new Date().getFullYear().toString(),
  duration: "",
  category: "Video Editing",
  span: "",
  desc: "",
  thumb: "",
  videoUrl: "",
};

export default function AddProjects() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.title ||
      !form.client ||
      !form.thumb ||
      !form.desc ||
      !form.duration
    ) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "projects"), {
        ...form,
        span: form.span === "Wide (col-span-2)" ? "col-span-2" : "",
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setForm(initialForm);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to add project. Try again.");
    } finally {
      setLoading(false);
    }
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
          Add{" "}
          <em className="not-italic bg-gradient-to-r from-gold via-gold-light to-gold-dark bg-[length:300%_100%] bg-clip-text text-transparent animate-shimmer">
            Project
          </em>
        </h2>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-3xl flex flex-col gap-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0.15}
      >
        {/* Row: Title + Client */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Title *"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Brand Story — Noon"
          />
          <Field
            label="Client *"
            name="client"
            value={form.client}
            onChange={handleChange}
            placeholder="Noon E-Commerce"
          />
        </div>

        {/* Row: Year + Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Year"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="2024"
          />
          <Field
            label="Duration *"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="2:30"
          />
        </div>

        {/* Row: Category + Span */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            options={categories}
          />
          <SelectField
            label="Grid Size"
            name="span"
            value={form.span}
            onChange={handleChange}
            options={spanOptions}
          />
        </div>

        {/* Thumbnail URL */}
        <Field
          label="Thumbnail URL *"
          name="thumb"
          value={form.thumb}
          onChange={handleChange}
          placeholder="https://images.unsplash.com/..."
        />

        {/* Thumbnail Preview */}
        <AnimatePresence>
          {form.thumb && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-2xl overflow-hidden border-0.5 border-gold/20"
              style={{ aspectRatio: "16/6" }}
            >
              <img
                src={form.thumb}
                alt="preview"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.7)" }}
                onError={(e) => (e.target.style.display = "none")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video URL */}
        <Field
          label="Video URL"
          name="videoUrl"
          value={form.videoUrl}
          onChange={handleChange}
          placeholder="https://youtube.com/watch?v=..."
        />

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="font-inter text-2xs tracking-widest-3 uppercase text-gold">
            Description *
          </label>
          <textarea
            name="desc"
            value={form.desc}
            onChange={handleChange}
            rows={4}
            placeholder="A full brand narrative cut for..."
            className="bg-gold/[0.03] border-0.5 border-gold/20 rounded-xl px-4 py-3 font-inter text-xs text-gold placeholder:text-gold/30 outline-none focus:border-gold transition-colors duration-200 resize-none"
          />
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-inter text-xs text-red-400/80"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="self-start flex items-center gap-3 font-inter text-2xs uppercase tracking-widest-3 text-gold border-0.5 border-gold/30 px-8 py-3 rounded-full hover:border-gold hover:bg-gold/10 transition-all duration-300 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="w-3 h-3 rounded-full border border-gold/40 border-t-gold animate-spin" />
              Saving...
            </>
          ) : (
            "Add Project"
          )}
        </motion.button>

        {/* Success */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 border-0.5 border-gold/25 bg-gold/[0.05] rounded-xl px-5 py-3 self-start"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-inter text-2xs tracking-widest-2 uppercase text-gold">
                Project added successfully
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
}

// ── Field Component ──────────────────────────────────────────
function Field({ label, name, value, onChange, placeholder }) {
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
        placeholder={placeholder}
        className="bg-gold/[0.03] border-0.5 border-gold/20 rounded-xl px-4 py-3 font-inter text-xs text-gold placeholder:text-gold/30 outline-none focus:border-gold transition-colors duration-200"
      />
    </div>
  );
}

// ── Select Component ─────────────────────────────────────────
function SelectField({ label, name, value, onChange, options }) {
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
