import { FaFilm, FaCamera } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";
import { motion } from "framer-motion";

const specialties = [
  {
    icon: <FaFilm size={20} />,
    title: "Video Editing",
    desc: "Narrative-driven cuts that hold attention from first frame to last — pacing, rhythm, and emotion in sync.",
    tag: "Primary Craft",
  },
  {
    icon: <FaCamera size={20} />,
    title: "Cinematography",
    desc: "Framing light and motion to build worlds. Every shot composed with intention and visual grammar.",
    tag: "Primary Craft",
  },
  {
    icon: <MdOutlineColorLens size={22} />,
    title: "Motion Graphics",
    desc: "Animated type, kinetic titles, and visual FX that breathe life into the story beyond the camera.",
    tag: "Primary Craft",
  },
];

const skills = [
  { label: "Color Grading", pct: 95 },
  { label: "Premiere Pro", pct: 98 },
  { label: "After Effects", pct: 90 },
  { label: "DaVinci Resolve", pct: 88 },
  { label: "Cinema 4D", pct: 75 },
];

const timeline = [
  { year: "2017", role: "Junior Editor", place: "Cairo Production House" },
  {
    year: "2019",
    role: "Senior Video Editor",
    place: "Freelance — Regional Brands",
  },
  {
    year: "2021",
    role: "Cinematographer + Editor",
    place: "Commercial & Branded Content",
  },
  { year: "2024", role: "Creative Director", place: "Independent Studio" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const skillVariant = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.4 + i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const dotVariant = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};
const timelineTextVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-hero py-0 md:py-14"
    >
      {/* Decorative orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          custom={0.05}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <span className="font-inter text-2xs tracking-widest-4 uppercase text-gold/70">
              The Creative Mind
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
          <h2
            className="font-cormorant font-light text-white leading-none tracking-[-1px] m-0"
            style={{ fontSize: "clamp(36px,5vw,68px)" }}
          >
            Crafting{" "}
            <em className="not-italic bg-gradient-to-r from-gold via-gold-light to-gold-dark bg-[length:300%_100%] bg-clip-text text-transparent animate-shimmer">
              Visual Stories
            </em>
          </h2>
          <div className="h-px w-28 mx-auto mt-6 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
          {/* ── LEFT COLUMN ── */}
          <div className="w-full flex-1">
            {/* Bio */}
            <motion.div
              className="mb-8 md:mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0.15}
            >
              <p className="font-inter font-light text-sm leading-[2] text-white/45 m-0">
                With over{" "}
                <span className="text-gold-light/85">
                  7 years behind the timeline
                </span>
                , I specialize in turning raw footage into cinematic language —
                where every cut breathes, every color speaks, and every frame
                carries weight.
              </p>
              <p className="font-inter font-light text-sm leading-[2] text-white/35 mt-4 m-0">
                From high-paced commercial edits to long-form documentary, my
                work lives at the intersection of technical precision and
                emotional storytelling.
              </p>
            </motion.div>

            {/* Specialty cards */}
            <div className="flex flex-col gap-3.5">
              {specialties.map((sp, i) => (
                <motion.div
                  key={sp.title}
                  custom={i}
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative border-0.5 border-gold/20 bg-gold/[0.03] rounded-2xl p-5 md:p-7 transition-all duration-300 hover:border-gold/45 hover:-translate-y-1 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-11 h-11 rounded-[10px] flex-shrink-0 bg-gold/[0.08] border-0.5 border-gold/30 flex items-center justify-center text-gold-light">
                      {sp.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1.5">
                        <span className="font-cormorant text-xl font-normal text-white">
                          {sp.title}
                        </span>
                        <span className="font-inter text-2xs tracking-widest-2 uppercase text-gold/50 border-0.5 border-gold/25 px-2 py-0.5 rounded-full whitespace-nowrap self-start sm:self-auto flex-shrink-0">
                          {sp.tag}
                        </span>
                      </div>
                      <p className="font-inter font-light text-xs leading-[1.75] text-white/35 m-0">
                        {sp.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col gap-10">
            {/* Skills */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0.2}
            >
              <div className="flex items-center gap-3.5 mb-6">
                <div className="h-px w-7 flex-shrink-0 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <span className="font-inter text-2xs tracking-widest-4 uppercase text-gold/65">
                  Technical Arsenal
                </span>
              </div>
              <div className="flex flex-col gap-[18px]">
                {skills.map((sk, i) => (
                  <motion.div
                    key={sk.label}
                    custom={i}
                    variants={skillVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-inter text-4xs font-normal text-white/55 tracking-widest-1.5">
                        {sk.label}
                      </span>
                      <span className="font-cormorant text-base text-gold/70">
                        {sk.pct}%
                      </span>
                    </div>
                    <div className="h-px bg-gold/[0.12] rounded-sm overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-gold to-gold-light rounded-sm"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${sk.pct}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.9,
                          delay: 0.5 + i * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

            {/* Timeline */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0.3}
            >
              <div className="flex items-center gap-3.5 mb-6">
                <div className="h-px w-7 flex-shrink-0 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <span className="font-inter text-2xs tracking-widest-4 uppercase text-gold/65">
                  Journey
                </span>
              </div>

              <div className="relative pl-6">
                <div className="absolute left-[3.5px] top-1.5 bottom-1.5 w-px bg-gradient-to-b from-gold/50 to-gold/[0.08]" />

                <div className="flex flex-col gap-7">
                  {timeline.map((t, i) => (
                    <div
                      key={t.year}
                      className="flex items-start gap-4 relative"
                    >
                      {/* Dot */}
                      <motion.div
                        custom={i}
                        variants={dotVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="absolute -left-6 mt-1 w-2 h-2 rounded-full border-0.5 border-gold bg-hero flex-shrink-0"
                      />
                      <motion.div
                        custom={i}
                        variants={timelineTextVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 mb-0.5">
                          <span className="font-cormorant font-light text-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark bg-[length:300%_100%] bg-clip-text text-transparent animate-shimmer">
                            {t.year}
                          </span>
                          <span className="font-inter text-4xs font-medium text-white/70 tracking-[0.5px]">
                            {t.role}
                          </span>
                        </div>
                        <span className="font-inter text-[10px] text-white/28 tracking-[0.5px]">
                          {t.place}
                        </span>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
