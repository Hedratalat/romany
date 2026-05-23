import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaLinkedin,
  FaFilm,
  FaCamera,
  FaMagic,
  FaPalette,
  FaPlay,
} from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";

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

const stats = [
  { num: "300+", label: "Projects" },
  { num: "7+", label: "Years XP" },
  { num: "50+", label: "Clients" },
];

const roles = ["Senior Video Editor", "Cinematographer", "Motion Graphics"];

const floatingIcons = [
  {
    icon: <FaFilm size={16} />,
    label: "Film",
    top: "8%",
    left: "-14%",
    delay: "0s",
    dur: "3.2s",
  },
  {
    icon: <FaCamera size={16} />,
    label: "Camera",
    top: "22%",
    right: "-14%",
    delay: "0.4s",
    dur: "2.8s",
  },
  {
    icon: <FaMagic size={14} />,
    label: "Motion",
    top: "52%",
    left: "-16%",
    delay: "0.8s",
    dur: "3.6s",
  },
  {
    icon: <FaPalette size={15} />,
    label: "Color",
    top: "68%",
    right: "-15%",
    delay: "0.2s",
    dur: "3s",
  },
  {
    icon: <FaPlay size={13} />,
    label: "Play",
    top: "85%",
    left: "-10%",
    delay: "1s",
    dur: "2.6s",
  },
  {
    icon: <MdOutlineColorLens size={17} />,
    label: "Grading",
    top: "38%",
    right: "-18%",
    delay: "0.6s",
    dur: "3.4s",
  },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-10 bg-hero"
    >
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  @keyframes popIn {
    0%   { opacity: 0; transform: scale(0.6) translateY(10px); }
    100% { opacity: 1; transform: scale(1)   translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .gold-text {
    background: linear-gradient(135deg, #c9a84c 0%, #f5e0a0 40%, #c9a84c 60%, #a07830 100%);
    background-size: 300% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s ease-in-out infinite;
  }
  .gold-line {
    background: linear-gradient(90deg, transparent, #c9a84c, #f5e0a0, #c9a84c, transparent);
  }
  .img-frame { position: relative; width: 100%; height: 100%; }
  .img-frame::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to right, #080808 0%, transparent 30%, transparent 70%, #080808 100%);
    z-index: 2;
  }
  .img-frame::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 28%;
    background: linear-gradient(to top, #080808, transparent);
    z-index: 2;
  }
  .float-icon {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    z-index: 10;
  }
  .float-icon-inner {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: rgba(8,8,8,0.82);
    border: 0.5px solid rgba(201,168,76,0.4);
    color: #f5e0a0;
    backdrop-filter: blur(10px);
    transition: all 0.3s;
  }
  .float-icon-inner:hover {
    border-color: rgba(201,168,76,0.8);
    background: rgba(20,16,6,0.92);
  }
  .float-icon-label {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(201,168,76,0.45);
    white-space: nowrap;
  }

  .animate-fadeIn   { animation: fadeIn   0.9s cubic-bezier(0.22,1,0.36,1) both; }
  .animate-fadeUp   { animation: fadeUp   0.7s cubic-bezier(0.22,1,0.36,1) both; }
  .animate-rotateSlow  { animation: rotateSlow 22s linear infinite; }
  .animate-rotateSlow2 { animation: rotateSlow 15s linear infinite reverse; }

  @media (max-width: 768px) {
  .hero-inner   { flex-direction: column !important; gap: 48px !important; }
  .hero-img-col { width: 100% !important; height: 340px !important; }
  .float-icon   { display: flex; }

  /* ── ظبط positions على موبايل ── */
  .float-icon:nth-child(1) { left: -5% !important; }
.float-icon:nth-child(2) { right: -5% !important; top: 10% !important; }
  .float-icon:nth-child(3) { left: -5% !important; }
  .float-icon:nth-child(4) { right: -5% !important; }
  .float-icon:nth-child(5) { left:  -5% !important; }
  .float-icon:nth-child(6) { right: -5% !important; }
}
`}</style>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
        }}
      />

      {/* CONTAINER */}
      <div className="relative z-[1] w-full max-w-7xl mx-auto px-8 py-16">
        <div className="hero-inner flex items-center gap-36">
          {/* ── IMAGE COLUMN ── */}
          <div
            className="hero-img-col animate-fadeIn relative flex-shrink-0 w-[40%] rounded-2xl overflow-visible"
            style={{ height: 600 }}
          >
            {/* Floating specialty icons */}
            {floatingIcons.map((fi) => (
              <div
                key={fi.label}
                className="float-icon"
                style={{
                  top: fi.top,
                  left: fi.left,
                  right: fi.right,
                  animation: `popIn 0.6s ${fi.delay} cubic-bezier(0.22,1,0.36,1) both, floatY ${fi.dur} ${fi.delay} ease-in-out infinite`,
                }}
              >
                <div className="float-icon-inner">{fi.icon}</div>
                <span className="float-icon-label">{fi.label}</span>
              </div>
            ))}

            {/* Image */}
            <div
              className="img-frame rounded-2xl overflow-hidden"
              style={{ height: 600 }}
            >
              <img
                src="/romany.jpg"
                alt="Portfolio"
                className="w-full object-cover object-top block"
                style={{
                  height: 600,
                  filter: "brightness(0.75) contrast(1.05)",
                }}
              />
            </div>

            {/* Ornamental rings */}
            <div
              className="absolute rounded-full border-0.5 border-[rgba(201,168,76,0.12)] pointer-events-none animate-rotateSlow"
              style={{
                width: 110,
                height: 110,
                top: "10%",
                left: "6%",
                zIndex: 3,
              }}
            />
            <div
              className="absolute rounded-full border-0.5 border-[rgba(201,168,76,0.12)] pointer-events-none animate-rotateSlow2"
              style={{
                width: 55,
                height: 55,
                bottom: "16%",
                right: "8%",
                zIndex: 3,
              }}
            />

            {/* Corner accents */}
            <div
              className="absolute z-[5] w-5 h-5 border-t-0.5 border-l-0.5 border-[rgba(201,168,76,0.5)]"
              style={{ top: 16, left: 16 }}
            />
            <div
              className="absolute z-[5] w-5 h-5 border-t-0.5 border-r-0.5 border-[rgba(201,168,76,0.5)]"
              style={{ top: 16, right: 16 }}
            />
            <div
              className="absolute z-[5] w-5 h-5 border-b-0.5 border-l-0.5 border-[rgba(201,168,76,0.5)]"
              style={{ bottom: 16, left: 16 }}
            />
            <div
              className="absolute z-[5] w-5 h-5 border-b-0.5 border-r-0.5 border-[rgba(201,168,76,0.5)]"
              style={{ bottom: 16, right: 16 }}
            />
          </div>

          {/* ── CONTENT COLUMN ── */}
          <div className="flex-1 flex flex-col gap-5">
            {/* Top label */}
            <div
              className="animate-fadeUp flex items-center gap-4 self-start"
              style={{ animationDelay: "0.2s" }}
            >
              <div
                className="gold-line flex-shrink-0"
                style={{ height: "0.5px", width: 40 }}
              />
              <span className="font-inter text-3xs ml:0 sm:-ml-12 tracking-widest-4 uppercase text-gold-light/80">
                Creative Visionary
              </span>
            </div>

            {/* Name */}
            <div className="animate-fadeUp" style={{ animationDelay: "0.3s" }}>
              <h1
                className="font-cormorant font-light leading-none tracking-[-1px] text-white m-0"
                style={{ fontSize: "clamp(48px,5vw,80px)" }}
              >
                Romany
              </h1>
              <h1
                className="font-cormorant font-light italic leading-none tracking-[-1px] gold-text m-0"
                style={{ fontSize: "clamp(48px,5vw,80px)" }}
              >
                Mamdouh
              </h1>
            </div>

            {/* Divider */}
            <div
              className="animate-fadeIn gold-line max-w-300"
              style={{ height: "0.5px", animationDelay: "0.5s" }}
            />

            {/* Roles */}
            <div
              className="animate-fadeUp flex flex-wrap gap-2"
              style={{ animationDelay: "0.5s" }}
            >
              {roles.map((r) => (
                <span
                  key={r}
                  className="font-inter text-3xs uppercase whitespace-nowrap text-gold rounded-full"
                  style={{
                    letterSpacing: "2.5px",
                    padding: "5px 14px",
                    border: "0.5px solid rgba(201,168,76,0.3)",
                    background: "rgba(201,168,76,0.05)",
                  }}
                >
                  {r}
                </span>
              ))}
            </div>

            {/* Description */}
            <p
              className="animate-fadeUp font-inter font-light text-sm leading-[1.85] max-w-360 m-0 text-white/40"
              style={{ animationDelay: "0.6s" }}
            >
              Turning raw footage into{" "}
              <em className="not-italic text-gold-light/80">
                cinematic stories
              </em>{" "}
              that resonate. Specialized in color grading, motion graphics, and
              visual storytelling across commercial and branded content.
            </p>

            {/* Stats */}
            <div
              className="animate-fadeUp flex items-center gap-8"
              style={{ animationDelay: "0.7s" }}
            >
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-8">
                  <div>
                    <div
                      className=" font-light leading-none tracking-[-1px] gold-text"
                      style={{ fontSize: "clamp(26px,2.8vw,38px)" }}
                    >
                      {s.num}
                    </div>
                    <div
                      className="font-inter uppercase mt-1 text-white/30 text-3xs"
                      style={{ letterSpacing: "2px" }}
                    >
                      {s.label}
                    </div>
                  </div>
                  {i < stats.length - 1 && (
                    <div
                      className="self-stretch bg-gold/20"
                      style={{ width: "0.5px" }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="animate-fadeUp flex flex-wrap gap-3"
              style={{ animationDelay: "0.8s" }}
            >
              <button
                className="font-inter font-medium text-4xs uppercase tracking-widest-3 cursor-pointer transition-all duration-200 hover:-translate-y-px text-hero"
                onClick={() => {
                  const el = document.getElementById("portfolio");
                  if (el) {
                    const offset = 80;
                    const top =
                      el.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                style={{
                  padding: "13px 32px",
                  border: "none",
                  background:
                    "linear-gradient(135deg, #c9a84c, #f5e0a0, #c9a84c)",
                  backgroundSize: "200% 100%",
                }}
              >
                View My Work
              </button>
              <button
                className="font-inter font-normal text-4xs uppercase tracking-widest-3 cursor-pointer 
                transition-all duration-300 hover:bg-gold/10 hover:text-gold-light text-gold"
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) {
                    const top =
                      el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                style={{
                  padding: "13px 32px",
                  background: "transparent",
                  border: "0.5px solid rgba(201,168,76,0.35)",
                }}
              >
                Let's Talk
              </button>
            </div>

            {/* Socials */}
            <div
              className="animate-fadeUp flex flex-wrap gap-2.5"
              style={{ animationDelay: "0.9s" }}
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full no-underline
                   transition-all duration-300 text-gold-light hover:bg-gold/10 cursor-pointer"
                  style={{ border: "0.5px solid rgba(201,168,76,0.4)" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
