import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

// ── Delete Confirmation Popup ────────────────────────────────
function DeleteConfirmPopup({ onConfirm, onCancel, isDeleting }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
        }}
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(20,16,12,0.98) 0%, rgba(12,10,8,0.99) 100%)",
            border: "0.5px solid rgba(212,175,100,0.25)",
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(212,175,100,0.08) inset",
          }}
        >
          {/* Icon */}
          <div className="flex flex-col items-center pt-8 pb-2 px-6">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "0.5px solid rgba(239,68,68,0.25)",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(239,68,68,0.8)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </div>

            <h3
              className="font-cormorant font-light text-white text-center mb-2"
              style={{ fontSize: "22px", letterSpacing: "0.01em" }}
            >
              Delete Message?
            </h3>
            <p
              className="font-inter text-center"
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.38)",
                letterSpacing: "0.03em",
                lineHeight: "1.6",
              }}
            >
              This action cannot be undone. The message will be permanently
              removed.
            </p>
          </div>

          {/* Divider */}
          <div
            className="mx-6 my-6"
            style={{
              height: "0.5px",
              background:
                "linear-gradient(to right, transparent, rgba(212,175,100,0.2), transparent)",
            }}
          />

          {/* Actions */}
          <div className="flex gap-3 px-6 pb-6">
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="flex-1 font-inter uppercase rounded-full transition-all duration-300 disabled:opacity-40"
              style={{
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "rgba(212,175,100,0.6)",
                border: "0.5px solid rgba(212,175,100,0.2)",
                padding: "10px 0",
                background: "transparent",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,100,0.45)";
                e.currentTarget.style.background = "rgba(212,175,100,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,100,0.2)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 font-inter uppercase rounded-full transition-all duration-300 disabled:opacity-40"
              style={{
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "rgba(239,68,68,0.85)",
                border: "0.5px solid rgba(239,68,68,0.3)",
                padding: "10px 0",
                background: "rgba(239,68,68,0.06)",
                cursor: isDeleting ? "wait" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!isDeleting) {
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.6)";
                  e.currentTarget.style.background = "rgba(239,68,68,0.12)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
                e.currentTarget.style.background = "rgba(239,68,68,0.06)";
              }}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function MessageDash() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const q = query(collection(db, "Messages"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!confirmDeleteId) return;
    setDeleting(confirmDeleteId);
    try {
      await deleteDoc(doc(db, "Messages", confirmDeleteId));
      setMessages((prev) => prev.filter((m) => m.id !== confirmDeleteId));
      if (expanded === confirmDeleteId) setExpanded(null);
    } catch {
      setError("Failed to delete message.");
    } finally {
      setDeleting(null);
      setConfirmDeleteId(null);
    }
  };

  const formatDate = (ts) => {
    if (!ts) return "—";
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-hero px-4 sm:px-8 py-10">
      {/* Delete Confirmation Popup */}
      {confirmDeleteId && (
        <DeleteConfirmPopup
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmDeleteId(null)}
          isDeleting={deleting === confirmDeleteId}
        />
      )}

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
          Client{" "}
          <em className="not-italic bg-gradient-to-r from-gold via-gold-light to-gold-dark bg-[length:300%_100%] bg-clip-text text-transparent animate-shimmer">
            Messages
          </em>
        </h2>
      </motion.div>

      {/* Count + Refresh */}
      <motion.div
        className="flex items-center justify-between mb-6 max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0.1}
      >
        {!loading && !error && (
          <span className="font-inter text-2xs tracking-widest-2 uppercase text-gold/50">
            {messages.length} {messages.length === 1 ? "message" : "messages"}
          </span>
        )}
        <button
          onClick={fetchMessages}
          className="ml-auto font-inter text-2xs uppercase tracking-widest-3 text-gold border-0.5 border-gold/30 px-5 py-2 rounded-full hover:border-gold hover:bg-gold/10 transition-all duration-300 cursor-pointer"
        >
          Refresh
        </button>
      </motion.div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-3 mt-16 justify-center">
          <span className="w-4 h-4 rounded-full border border-gold/40 border-t-gold animate-spin" />
          <span className="font-inter text-xs text-gold/50 tracking-widest-2 uppercase">
            Loading...
          </span>
        </div>
      )}

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-inter text-xs text-red-400/80 mt-4"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Empty */}
      {!loading && !error && messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3 mt-24 text-center"
        >
          <div className="w-12 h-12 rounded-full border-0.5 border-gold/20 flex items-center justify-center text-gold/30 text-xl">
            ✉
          </div>
          <span className="font-inter text-xs text-gold/30 tracking-widest-2 uppercase">
            No messages yet
          </span>
        </motion.div>
      )}

      {/* Messages List */}
      {!loading && messages.length > 0 && (
        <motion.div
          className="max-w-3xl flex flex-col gap-4"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                variants={itemVariant}
                exit="exit"
                layout
                className="border-0.5 border-gold/15 bg-gold/[0.03] rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-300"
              >
                {/* Card Header */}
                <button
                  onClick={() =>
                    setExpanded(expanded === msg.id ? null : msg.id)
                  }
                  className="w-full text-left px-5 py-4 flex items-center gap-4 cursor-pointer"
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full flex-shrink-0 bg-gold/[0.08] border-0.5 border-gold/25 flex items-center justify-center font-cormorant text-gold text-base font-light select-none">
                    {msg.name?.[0]?.toUpperCase() ?? "?"}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-inter text-xs text-white/75 font-light truncate">
                        {msg.name}
                      </span>
                      {msg.serviceType && (
                        <span className="font-inter text-[9px] tracking-widest-2 uppercase text-gold/60 border-0.5 border-gold/25 px-2 py-0.5 rounded-full">
                          {msg.serviceType}
                        </span>
                      )}
                    </div>
                    <p className="font-inter text-[10px] text-gold/40 tracking-widest-2 uppercase mt-0.5 truncate">
                      {msg.subject}
                    </p>
                  </div>

                  {/* Date + chevron */}
                  <div className="flex-shrink-0 flex flex-col items-end gap-1">
                    <span className="font-inter text-[10px] text-white/25">
                      {formatDate(msg.createdAt)}
                    </span>
                    <motion.span
                      animate={{ rotate: expanded === msg.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gold/40 text-xs"
                    >
                      ↓
                    </motion.span>
                  </div>
                </button>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expanded === msg.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 flex flex-col gap-4 border-t-0.5 border-gold/10 pt-4">
                        {/* Info Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <InfoCell
                            label="Email"
                            value={msg.email}
                            href={`mailto:${msg.email}`}
                          />
                          <InfoCell
                            label="WhatsApp"
                            value={msg.phone}
                            href={`https://wa.me/${msg.phone?.replace(/\D/g, "")}`}
                          />
                          <InfoCell label="Country" value={msg.country} />
                          <InfoCell label="Service" value={msg.serviceType} />
                          <InfoCell label="Subject" value={msg.subject} />
                          <InfoCell
                            label="Date"
                            value={formatDate(msg.createdAt)}
                          />
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

                        {/* Message */}
                        <div className="flex flex-col gap-1.5">
                          <span className="font-inter text-2xs tracking-widest-3 uppercase text-gold/45">
                            Message
                          </span>
                          <p className="font-inter text-xs text-white/55 leading-relaxed whitespace-pre-wrap">
                            {msg.message}
                          </p>
                        </div>

                        {/* Actions — Delete only */}
                        <div className="flex items-center justify-end mt-1">
                          <button
                            onClick={() => setConfirmDeleteId(msg.id)}
                            className="font-inter text-2xs uppercase tracking-widest-3 text-red-400/60 border-0.5 border-red-400/20 px-4 py-2 rounded-full hover:border-red-400/50 hover:bg-red-400/5 transition-all duration-300 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

// ── Info Cell ────────────────────────────────────────────────
function InfoCell({ label, value, href }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-inter text-[9px] tracking-widest-3 uppercase text-gold/40">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-inter text-[11px] text-white/55 hover:text-gold-light transition-colors duration-200 truncate no-underline"
        >
          {value || "—"}
        </a>
      ) : (
        <span className="font-inter text-[11px] text-white/55 truncate">
          {value || "—"}
        </span>
      )}
    </div>
  );
}
