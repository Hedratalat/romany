import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const categories = [
  "All",
  "Video Editing",
  "Cinematography",
  "Motion Graphics",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const gridItem = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.3 } },
};

function getEmbedUrl(url) {
  if (!url) return null;
  try {
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes("watch?v=")) {
      const id = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes("youtube.com/embed/")) {
      return url.includes("autoplay") ? url : url + "?autoplay=1";
    }
  } catch {
    return null;
  }
  return null;
}

function TabBtn({ cat, active, onClick }) {
  const isActive = active === cat;
  return (
    <button
      onClick={() => onClick(cat)}
      className={`relative font-inter text-2xs uppercase tracking-widest-3 px-5 py-2.5 rounded-full border-0.5 transition-all duration-300 cursor-pointer ${
        isActive
          ? "text-hero border-gold"
          : "text-gold/70 border-gold/20 hover:border-gold/40 hover:text-gold-light"
      }`}
      style={
        isActive
          ? {
              background: "linear-gradient(135deg,#c9a84c,#f5e0a0,#c9a84c)",
              backgroundSize: "200% 100%",
            }
          : {}
      }
    >
      {cat}
      {isActive && (
        <motion.span
          layoutId="tab-indicator"
          className="absolute inset-0 rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  );
}

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "projects"), (snap) => {
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);
  const visible = filtered.slice(0, visibleCount);

  const handleFilterChange = (cat) => {
    setActive(cat);
    setVisibleCount(8);
  };

  const openLightbox = (p) => {
    setLightbox(p);
    setPlaying(false);
  };

  const closeLightbox = () => {
    setLightbox(null);
    setPlaying(false);
  };

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-hero py-14 md:py-14"
    >
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.04)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          custom={0.05}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <span className="font-inter text-2xs tracking-widest-4 uppercase text-gold/70">
              Selected Work
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
          <h2
            className="font-cormorant font-light text-white leading-none tracking-[-1px] m-0"
            style={{ fontSize: "clamp(36px,5vw,68px)" }}
          >
            The{" "}
            <em className="not-italic bg-gradient-to-r from-gold via-gold-light to-gold-dark bg-[length:300%_100%] bg-clip-text text-transparent animate-shimmer">
              Portfolio
            </em>
          </h2>
          <div className="h-px w-28 mx-auto mt-6 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.15}
        >
          <TabBtn cat="All" active={active} onClick={handleFilterChange} />
          <div className="flex flex-wrap justify-center gap-2">
            {categories
              .filter((c) => c !== "All")
              .map((cat) => (
                <TabBtn
                  key={cat}
                  cat={cat}
                  active={active}
                  onClick={handleFilterChange}
                />
              ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px]"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                custom={i}
                variants={gridItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                exit="exit"
                className={`relative overflow-hidden rounded-2xl border-0.5 border-gold/10 group cursor-pointer ${p.span}`}
                onClick={() => openLightbox(p)}
              >
                <img
                  src={p.thumb}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: "brightness(0.6) contrast(1.05)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hero via-hero/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-2xl border-0.5 border-gold/0 group-hover:border-gold/35 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-gold/20 border-0.5 border-gold/50 backdrop-blur-sm flex items-center justify-center text-gold-light">
                    <FaPlay size={14} className="ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="font-inter text-2xs uppercase tracking-widest-2 text-gold/70 border-0.5 border-gold/25 bg-hero/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {p.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="font-inter text-2xs text-white/50 bg-hero/60 backdrop-blur-sm px-2 py-1 rounded-full">
                    {p.duration}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="font-cormorant text-lg font-normal text-white leading-tight mb-1">
                    {p.title}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-2xs text-white/40 tracking-widest-1.5">
                      {p.client}
                    </span>
                    <span className="font-inter text-2xs text-gold/50">
                      {p.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Count + Load More */}
        <motion.div
          className="text-center mt-10 flex flex-col items-center gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <span className="font-inter text-2xs uppercase tracking-widest-3 text-white/20">
            Showing {Math.min(visibleCount, filtered.length)} of{" "}
            {filtered.length} projects
          </span>
          {visibleCount < filtered.length && (
            <motion.button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="font-inter text-2xs uppercase tracking-widest-3 text-gold/70 border-0.5 border-gold/30 px-8 py-3 rounded-full hover:border-gold/55 hover:text-gold-light transition-all duration-300 cursor-pointer"
            >
              Load More
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
          >
            <div className="absolute inset-0 bg-hero/92 backdrop-blur-md" />
            <motion.div
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video / Thumb */}
              <div
                className="relative rounded-2xl overflow-hidden border-0.5 border-gold/20"
                style={{ aspectRatio: "16/9" }}
              >
                {playing && getEmbedUrl(lightbox.videoUrl) ? (
                  <iframe
                    src={getEmbedUrl(lightbox.videoUrl)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={lightbox.thumb}
                      alt={lightbox.title}
                      className="w-full h-full object-cover"
                      style={{ filter: "brightness(0.75)" }}
                    />
                    {lightbox.videoUrl && (
                      <div
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlaying(true);
                        }}
                      >
                        <div className="w-16 h-16 rounded-full bg-gold/20 border-0.5 border-gold/50 backdrop-blur-sm flex items-center justify-center text-gold-light hover:bg-gold/30 transition-all duration-200">
                          <FaPlay size={20} className="ml-1" />
                        </div>
                      </div>
                    )}
                  </>
                )}
                <div className="absolute top-4 left-4 w-5 h-5 border-t-0.5 border-l-0.5 border-gold/50 pointer-events-none" />
                <div className="absolute top-4 right-4 w-5 h-5 border-t-0.5 border-r-0.5 border-gold/50 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-5 h-5 border-b-0.5 border-l-0.5 border-gold/50 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-5 h-5 border-b-0.5 border-r-0.5 border-gold/50 pointer-events-none" />
              </div>

              {/* Meta */}
              <div className="mt-5 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <h3 className="font-cormorant text-2xl font-light text-white leading-none mb-2">
                      {lightbox.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-inter text-2xs uppercase tracking-widest-2 text-gold/60">
                        {lightbox.client}
                      </span>
                      <span className="w-px h-3 bg-gold/20" />
                      <span className="font-inter text-2xs text-white/30">
                        {lightbox.year}
                      </span>
                      <span className="w-px h-3 bg-gold/20" />
                      <span className="font-inter text-2xs text-white/30">
                        {lightbox.duration}
                      </span>
                    </div>
                  </div>
                  <span className="font-inter text-2xs uppercase tracking-widest-2 text-gold/50 border-0.5 border-gold/25 px-3 py-1.5 rounded-full self-start flex-shrink-0">
                    {lightbox.category}
                  </span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                <p className="font-inter font-light text-sm leading-[1.85] text-white/45 m-0">
                  {lightbox.desc}
                </p>
              </div>
            </motion.div>

            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full border-0.5 border-gold/25 text-white/50 hover:text-gold-light hover:border-gold/50 transition-all duration-200 cursor-pointer bg-hero/60 backdrop-blur-sm"
            >
              <MdClose size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
