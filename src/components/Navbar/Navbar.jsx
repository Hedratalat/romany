import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "Home", to: "#home" },
  { name: "About", to: "#about" },
  { name: "Portfolio", to: "#portfolio" },
  { name: "Contact", to: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const observers = navLinks.map((link) => {
      const el = document.querySelector(link.to);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(link.name);
        },
        {
          rootMargin: "-30% 0px -60% 0px",
          threshold: 0,
        },
      );

      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const handleNav = (link) => {
    setActive(link.name);
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(link.to);
      if (el) {
        const navHeight = 88;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 350); // بيستنى الـ menu animation تخلص الأول
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-hero/95 backdrop-blur-md border-b border-0.5 border-gold/10 shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
          : "bg-gradient-to-b from-[#080808] via-[#080808]/60 to-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* ── Logo ── */}
          <button
            onClick={() => handleNav(navLinks[0])}
            className="cursor-pointer flex flex-col items-start leading-none group"
          >
            <span
              className="font-cormorant font-light text-white tracking-[-0.5px] leading-none group-hover:text-gold-light transition-colors duration-300"
              style={{ fontSize: "clamp(28px,3vw,40px)" }}
            >
              Romany
            </span>
            <div className="flex items-center gap-2 w-full mt-2">
              <span className="h-px flex-1 bg-gradient-to-r from-gold/50 to-transparent" />
              <span
                className="font-inter font-light uppercase text-gold/60 group-hover:text-gold/90 transition-colors duration-300"
                style={{ fontSize: "10px", letterSpacing: "4px" }}
              >
                Mamdouh
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-gold/50 to-transparent" />
            </div>
          </button>

          {/* ── Desktop Links ── */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  <button
                    onClick={() => handleNav(link)}
                    className={`font-inter text-xs uppercase tracking-widest-3 transition-all duration-300 cursor-pointer ${
                      active === link.name
                        ? "text-gold-light"
                        : "text-white/50 hover:text-white/85"
                    }`}
                  >
                    {link.name}
                  </button>
                  {active === link.name && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => handleNav(navLinks[3])}
              className="font-inter text-xs uppercase tracking-widest-3 text-hero px-7 py-3 transition-all duration-300 hover:-translate-y-px cursor-pointer"
              style={{
                background: "linear-gradient(135deg,#c9a84c,#f5e0a0,#c9a84c)",
                backgroundSize: "200% 100%",
                border: "none",
                borderRadius: 4,
              }}
            >
              Hire Me
            </button>
          </div>

          {/* ── Mobile Burger ── */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border-0.5 border-gold/30 text-gold/70 hover:text-gold-light hover:border-gold/55 transition-all duration-300 cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes size={16} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-hero/95 backdrop-blur-md border-t border-0.5 border-gold/10"
          >
            <div className="max-w-7xl mx-auto px-5 py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <button
                    onClick={() => handleNav(link)}
                    className={`w-full text-left font-inter text-sm uppercase tracking-widest-3 px-5 py-4 rounded-xl border-0.5 transition-all duration-300 cursor-pointer ${
                      active === link.name
                        ? "text-gold-light border-gold/25 bg-gold/[0.06]"
                        : "text-white/50 border-transparent hover:text-white/75 hover:bg-gold/[0.03]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {link.name}
                      {active === link.name && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      )}
                    </div>
                  </button>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.32,
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => handleNav(navLinks[3])}
                className="mt-2 w-full font-inter text-sm uppercase tracking-widest-3 text-hero py-4 transition-all duration-300 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg,#c9a84c,#f5e0a0,#c9a84c)",
                  backgroundSize: "200% 100%",
                  border: "none",
                  borderRadius: 8,
                }}
              >
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
