import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlinePhone,
} from "react-icons/md";
import { motion } from "framer-motion";

const socials = [
  {
    icon: <FaWhatsapp size={15} />,
    label: "WhatsApp",
    href: "https://wa.me/971503657838",
  },
  {
    icon: <FaInstagram size={15} />,
    label: "Instagram",
    href: "https://www.instagram.com/romanymamdouh_1?igsh=MTdybGE2MXV3emhwaQ%3D%3D&utm_source=qr",
  },
  {
    icon: <FaLinkedin size={15} />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/romany-mamdouh-51ba54302?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    icon: <FaFacebook size={15} />,
    label: "Facebook",
    href: "https://www.facebook.com/share/1cm349kcL1/?mibextid=wwXIfr",
  },
  {
    icon: <FaTiktok size={15} />,
    label: "TikTok",
    href: "https://www.tiktok.com/@romanymamdouh817?_r=1&_t=ZS-96UKA02GubI",
  },
];

const navLinks = [
  { name: "Home", to: "#home" },
  { name: "About", to: "#about" },
  { name: "Portfolio", to: "#portfolio" },
  { name: "Contact", to: "#contact" },
];

const services = [
  "Video Editing",
  "Cinematography",
  "Motion Graphics",
  "Color Grading",
  "Brand Films",
  "Social Reels",
];

const contactInfo = [
  { icon: <MdOutlineEmail size={14} />, value: "romany@studio.com" },
  { icon: <MdOutlinePhone size={14} />, value: "+20 100 000 0000" },
  { icon: <MdOutlineLocationOn size={14} />, value: "Cairo, Egypt" },
];

const handleNav = (to) => {
  const el = document.querySelector(to);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-hero border-t border-0.5 border-gold/10">
      {/* Orbs */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* ── Top divider line ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-16" />

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-16 place-items-center lg:place-items-start">
          {/* Col 1 — Brand */}
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left w-1/2 lg:w-full mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo */}
            <div className="mb-5">
              <span
                className="font-cormorant font-light text-white tracking-[-0.5px] leading-none block"
                style={{ fontSize: "clamp(28px,3vw,36px)" }}
              >
                Romany
              </span>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="h-px flex-1 bg-gradient-to-r from-gold/50 to-transparent" />
                <span
                  className="font-inter font-light uppercase text-gold/60"
                  style={{ fontSize: "9px", letterSpacing: "4px" }}
                >
                  Mamdouh
                </span>
                <span className="h-px flex-1 bg-gradient-to-l from-gold/50 to-transparent" />
              </div>
            </div>

            <p className="font-inter font-light text-sm leading-[1.9] text-white mb-6 max-w-[220px]">
              Turning raw footage into{" "}
              <em className="not-italic text-gold-light/70">
                cinematic stories
              </em>{" "}
              that resonate across commercial and branded content.
            </p>

            {/* Socials */}
            <div className="flex flex-nowrap gap-2 justify-center lg:justify-start">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-8 h-8 flex items-center justify-center rounded-full border-0.5 border-gold/25 text-gold
                   hover:text-gold-light hover:border-gold/50 hover:bg-gold/[0.08] transition-colors duration-300 no-underline"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Quick Links */}
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left w-1/2 lg:w-full mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-5 flex-shrink-0 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <span className="font-inter text-2xs tracking-widest-4 uppercase text-gold">
                Quick Links
              </span>
            </div>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNav(link.to)}
                    className="font-inter text-xs text-white hover:text-gold-light
                     transition-colors duration-300 cursor-pointer tracking-widest-1.5 uppercase 
                     flex items-center justify-center lg:justify-start gap-2 group"
                  >
                    <span className="w-3 h-px bg-gold/0 group-hover:bg-gold/50 transition-all duration-300 flex-shrink-0" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Services */}
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left w-1/2 lg:w-full mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-5 flex-shrink-0 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <span className="font-inter text-2xs tracking-widest-4 uppercase text-gold">
                Services
              </span>
            </div>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li
                  key={s}
                  className="font-inter text-xs text-white tracking-widest-1.5 uppercase flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-gold/30 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Contact */}
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left w-1/2 lg:w-full mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-5 flex-shrink-0 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <span className="font-inter text-2xs tracking-widest-4 uppercase text-gold">
                Contact
              </span>
            </div>
            <ul className="flex flex-col gap-4 mb-6">
              {contactInfo.map((c) => (
                <li key={c.value} className="flex items-center gap-3">
                  <span className="text-gold/50 flex-shrink-0">{c.icon}</span>
                  <span className="font-inter text-xs text-white tracking-[0.5px]">
                    {c.value}
                  </span>
                </li>
              ))}
            </ul>

            {/* Availability badge */}
            <div className="flex items-center gap-2.5 border-0.5 border-gold/20 bg-gold/[0.04] rounded-xl px-3.5 py-2.5 self-start w-fit">
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
              </span>
              <span className="font-inter text-2xs tracking-widest-2 uppercase text-gold">
                Available for projects
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/15 to-transparent mb-6" />

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="font-inter text-[10px] lg:text-xs text-white tracking-widest-2 flex items-center gap-1.5">
            © {new Date().getFullYear()} Romany Mamdouh. All rights reserved.
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
