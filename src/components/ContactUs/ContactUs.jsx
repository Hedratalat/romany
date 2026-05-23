import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaLinkedin,
} from "react-icons/fa";
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlinePhone,
} from "react-icons/md";
import { useState } from "react";

// ── Firebase ────────────────────────────────────────────────
import { db } from "../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// ── Zod Schema ──────────────────────────────────────────────
const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .regex(/^[a-zA-Z\s\u0600-\u06FF]+$/, "Name can only contain letters"),

  email: z
    .string()
    .email("Please enter a valid email address.")
    .refine(
      (val) => {
        const lowerVal = val.toLowerCase();
        return /^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.(com|net|org)(\.eg)?$/.test(
          lowerVal,
        );
      },
      { message: "Email must be a valid Gmail address" },
    ),

  phone: z
    .string()
    .min(1, "WhatsApp number is required")
    .regex(/^[+]?[\d\s\-().]{7,20}$/, "Please enter a valid WhatsApp number"),

  country: z
    .string()
    .min(1, "Country is required")
    .min(2, "Country name must be at least 2 characters")
    .max(60, "Country name is too long")
    .regex(/^[a-zA-Z\s\-'.،أ-ي]+$/, "Please enter a valid country name"),

  serviceType: z
    .string()
    .min(1, "Service type is required")
    .min(2, "Please describe the service type")
    .max(100, "Service type is too long"),

  subject: z
    .string()
    .min(1, "Subject is required")
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject is too long")
    .regex(/^[a-zA-Z0-9\s\-'.,!?،أ-ي]+$/, "Subject contains invalid characters")
    .refine(
      (val) => val.trim().split(/\s+/).length >= 1,
      "Subject seems too short",
    )
    .refine(
      (val) => !/(.)\1{4,}/.test(val),
      "Subject contains repeated characters",
    )
    .refine(
      (val) => val.trim() === val || val.trim().length > 0,
      "Subject cannot be only spaces",
    ),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long (max 1000 characters)"),
});

// ── Data ────────────────────────────────────────────────────
const contactInfo = [
  {
    icon: <MdOutlineEmail size={18} />,
    label: "Email",
    value: "romanymamdouh02@gmail.com",
    href: "mailto:romanymamdouh02@gmail.com",
  },
  {
    icon: <MdOutlinePhone size={18} />,
    label: "Phone",
    value: "+971503657838",
    href: "tel:+971503657838",
  },
  {
    icon: <MdOutlineLocationOn size={18} />,
    label: "Based In",
    value: "United Arab Emirates",
    href: null,
  },
];

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

// ── Animation Variants ──────────────────────────────────────
const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const formFieldVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.35 + i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ── Component ───────────────────────────────────────────────
export default function ContactUs() {
  const [sent, setSent] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), mode: "onTouched" });

  const onSubmit = async (data) => {
    setFirebaseError(null);
    try {
      // ── إرسال البيانات لـ Firestore ──
      await addDoc(collection(db, "Messages"), {
        name: data.name,
        email: data.email,
        phone: data.phone,
        country: data.country,
        serviceType: data.serviceType,
        subject: data.subject,
        message: data.message,
        createdAt: serverTimestamp(),
      });

      setSent(true);
      reset();
      setTimeout(() => setSent(false), 3500);
    } catch (err) {
      console.error("Firestore error:", err);
      setFirebaseError("Failed to send message. Please try again.");
    }
  };

  const inputBase =
    "w-full bg-gold/[0.03] border-0.5 rounded-xl px-4 py-3 font-inter text-sm font-light text-white/80 placeholder:text-white/20 outline-none transition-all duration-300 focus:bg-gold/[0.06]";

  const inputClass = (hasError) =>
    `${inputBase} ${hasError ? "border-red-400/50 focus:border-red-400/70" : "border-gold/20 focus:border-gold/50"}`;

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-hero py-0 md:py-14"
    >
      {/* Decorative orbs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUpVariants}
          custom={0.05}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <span className="font-inter text-2xs tracking-widest-4 uppercase text-gold/70">
              Get In Touch
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
          <h2
            className="font-cormorant font-light text-white leading-none tracking-[-1px] m-0"
            style={{ fontSize: "clamp(36px,5vw,68px)" }}
          >
            Let's{" "}
            <em className="not-italic bg-gradient-to-r from-gold via-gold-light to-gold-dark bg-[length:300%_100%] bg-clip-text text-transparent animate-shimmer">
              Create Together
            </em>
          </h2>
          <div className="h-px w-28 mx-auto mt-6 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="font-inter font-light text-sm text-white/35 mt-5 max-w-md mx-auto leading-[1.9]">
            Have a project in mind? I'd love to hear about it. Send a message
            and let's build something cinematic.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* ── LEFT — Info ── */}
          <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-8">
            <motion.div
              className="flex flex-col gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              {contactInfo.map((c) => (
                <motion.div
                  key={c.label}
                  variants={itemVariant}
                  className="flex items-center gap-4 border-0.5 border-gold/15 bg-gold/[0.03] rounded-xl px-4 py-4 group transition-all duration-300 hover:border-gold/35 hover:bg-gold/[0.06]"
                >
                  <div className="w-9 h-9 rounded-lg flex-shrink-0 bg-gold/[0.08] border-0.5 border-gold/25 flex items-center justify-center text-gold/80 group-hover:text-gold-light transition-colors duration-300">
                    {c.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-inter text-2xs tracking-widest-2 uppercase text-gold/45 mb-0.5">
                      {c.label}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="font-inter text-xs text-white/60 hover:text-gold-light transition-colors duration-200 truncate block no-underline"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <span className="font-inter text-xs text-white/60 truncate block">
                        {c.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            />

            {/* Socials */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUpVariants}
              custom={0.25}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-7 flex-shrink-0 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <span className="font-inter text-2xs tracking-widest-4 uppercase text-gold/55">
                  Follow Me
                </span>
              </div>
              <motion.div
                className="flex flex-wrap gap-2.5"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    variants={itemVariant}
                    whileHover={{ y: -3, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-9 h-9 flex items-center justify-center rounded-full border-0.5 border-gold/30 text-gold hover:text-gold-light hover:bg-gold/10 hover:border-gold/55 transition-colors duration-300 no-underline"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              className="flex items-center gap-3 border-0.5 border-gold/20 bg-gold/[0.04] rounded-xl px-4 py-3 self-start"
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <span className="font-inter text-2xs tracking-widest-2 uppercase text-gold/60">
                Available for projects
              </span>
            </motion.div>
          </div>

          {/* ── RIGHT — Form ── */}
          <motion.div
            className="w-full flex-1"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative border-0.5 border-gold/15 bg-gold/[0.02] rounded-2xl p-6 md:p-8 overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-0.5 border-l-0.5 border-gold/35 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-0.5 border-r-0.5 border-gold/35 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-0.5 border-l-0.5 border-gold/35 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-0.5 border-r-0.5 border-gold/35 pointer-events-none" />

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Name + Email */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    custom={0}
                    variants={formFieldVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex-1 flex flex-col gap-1.5"
                  >
                    <label className="font-inter text-2xs tracking-widest-2 uppercase text-gold">
                      Name *
                    </label>
                    <input
                      {...register("name")}
                      data-gramm="false"
                      data-gramm_editor="false"
                      placeholder="Your name"
                      className={inputClass(errors.name)}
                    />
                    {errors.name && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-inter text-[10px] text-red-400/80 mt-0.5"
                      >
                        {errors.name.message}
                      </motion.span>
                    )}
                  </motion.div>

                  <motion.div
                    custom={1}
                    variants={formFieldVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex-1 flex flex-col gap-1.5"
                  >
                    <label className="font-inter text-2xs tracking-widest-2 uppercase text-gold">
                      Email *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      data-gramm="false"
                      data-gramm_editor="false"
                      placeholder="your@email.com"
                      className={inputClass(errors.email)}
                    />
                    {errors.email && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-inter text-[10px] text-red-400/80 mt-0.5"
                      >
                        {errors.email.message}
                      </motion.span>
                    )}
                  </motion.div>
                </div>

                {/* WhatsApp + Country */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    custom={2}
                    variants={formFieldVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex-1 flex flex-col gap-1.5"
                  >
                    <label className="font-inter text-2xs tracking-widest-2 uppercase text-gold">
                      WhatsApp *
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      data-gramm="false"
                      data-gramm_editor="false"
                      placeholder="Enter your WhatsApp number"
                      className={inputClass(errors.phone)}
                    />
                    {errors.phone && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-inter text-[10px] text-red-400/80 mt-0.5"
                      >
                        {errors.phone.message}
                      </motion.span>
                    )}
                  </motion.div>

                  <motion.div
                    custom={3}
                    variants={formFieldVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex-1 flex flex-col gap-1.5"
                  >
                    <label className="font-inter text-2xs tracking-widest-2 uppercase text-gold">
                      Country *
                    </label>
                    <input
                      {...register("country")}
                      data-gramm="false"
                      data-gramm_editor="false"
                      placeholder="e.g. Egypt, UAE..."
                      className={inputClass(errors.country)}
                    />
                    {errors.country && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-inter text-[10px] text-red-400/80 mt-0.5"
                      >
                        {errors.country.message}
                      </motion.span>
                    )}
                  </motion.div>
                </div>

                {/* Service Type + Subject */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    custom={4}
                    variants={formFieldVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex-1 flex flex-col gap-1.5"
                  >
                    <label className="font-inter text-2xs tracking-widest-2 uppercase text-gold">
                      Service Type *
                    </label>
                    <input
                      {...register("serviceType")}
                      data-gramm="false"
                      data-gramm_editor="false"
                      placeholder="Video Editing, Color Grading, Reels..."
                      className={inputClass(errors.serviceType)}
                    />
                    {errors.serviceType && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-inter text-[10px] text-red-400/80 mt-0.5"
                      >
                        {errors.serviceType.message}
                      </motion.span>
                    )}
                  </motion.div>

                  <motion.div
                    custom={5}
                    variants={formFieldVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex-1 flex flex-col gap-1.5"
                  >
                    <label className="font-inter text-2xs tracking-widest-2 uppercase text-gold">
                      Subject *
                    </label>
                    <input
                      {...register("subject")}
                      data-gramm="false"
                      data-gramm_editor="false"
                      placeholder="Project subject"
                      className={inputClass(errors.subject)}
                    />
                    {errors.subject && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-inter text-[10px] text-red-400/80 mt-0.5"
                      >
                        {errors.subject.message}
                      </motion.span>
                    )}
                  </motion.div>
                </div>

                {/* Message */}
                <motion.div
                  custom={6}
                  variants={formFieldVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col gap-1.5"
                >
                  <label className="font-inter text-2xs tracking-widest-2 uppercase text-gold">
                    Message *
                  </label>
                  <textarea
                    {...register("message")}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className={`${inputClass(errors.message)} resize-none`}
                    data-gramm="false"
                    data-gramm_editor="false"
                  />
                  {errors.message && (
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-inter text-[10px] text-red-400/80 mt-0.5"
                    >
                      {errors.message.message}
                    </motion.span>
                  )}
                </motion.div>

                {/* Firebase Error */}
                {firebaseError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-inter text-[11px] text-red-400/80 text-center"
                  >
                    {firebaseError}
                  </motion.p>
                )}

                {/* Submit */}
                <motion.div
                  custom={7}
                  variants={formFieldVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-1 flex justify-end"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || sent}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-full sm:w-auto font-inter text-4xs font-medium uppercase tracking-widest-3 text-hero px-8 py-3.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: sent
                        ? "linear-gradient(135deg,#4a7c59,#7dbf8a)"
                        : "linear-gradient(135deg,#c9a84c,#f5e0a0,#c9a84c)",
                      backgroundSize: "200% 100%",
                      border: "none",
                      borderRadius: 4,
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 justify-center">
                        <motion.span
                          className="inline-block w-3 h-3 border border-hero/60 border-t-hero rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.7,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Sending...
                      </span>
                    ) : sent ? (
                      "✓ Message Sent"
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
