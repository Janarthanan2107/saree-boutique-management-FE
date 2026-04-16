import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

function FloatingInput({ id, label, type = "text", value, onChange, error, textarea }) {
  const isActive = value.length > 0;
  const common =
    "peer block w-full resize-none border-0 border-b border-foreground/15 bg-transparent px-0 pt-6 pb-2 font-body text-sm text-foreground transition-colors duration-300 placeholder-shown:placeholder-transparent focus:border-gold focus:outline-none";

  const labelClass = `pointer-events-none absolute left-0 transition-all duration-300 ${
    isActive
      ? "top-0 text-[0.65rem] uppercase tracking-[0.15em] text-gold"
      : "top-6 text-sm text-muted-foreground"
  } peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:uppercase peer-focus:tracking-[0.15em] peer-focus:text-gold`;

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          placeholder=" "
          className={common}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          className={common}
        />
      )}
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {error ? <p className="mt-2 font-body text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

const emailOk = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name) next.name = "Name is required";
    if (!email) next.email = "Email is required";
    else if (!emailOk(email)) next.email = "Enter a valid email";
    if (message.length < 10) next.message = "Tell us a little more (at least 10 characters)";
    if (name.length > 100) next.name = "Name is too long";
    if (email.length > 255) next.email = "Email is too long";
    if (message.length > 1000) next.message = "Message is too long";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="px-6 pb-24 pt-12 md:px-16 md:pb-32 lg:px-[120px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto max-w-[1200px]"
        >
          <p className="label-luxury">Atelier Enquiries</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-foreground md:text-7xl">
            Begin a conversation
          </h1>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-muted-foreground">
            Whether you seek a bridal trousseau, a single heirloom drape, or a private viewing —
            our curators respond personally to every enquiry.
          </p>
        </motion.div>

        <div className="mx-auto mt-20 grid max-w-[1200px] gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-12"
          >
            <div>
              <p className="label-luxury">Visit the Atelier</p>
              <p className="mt-4 font-display text-2xl text-foreground">14, Mylapore Heritage Lane</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
                Chennai, Tamil Nadu 600004
                <br />
                India
              </p>
              <p className="mt-4 font-body text-xs uppercase tracking-[0.15em] text-gold">
                By appointment · Tue – Sat · 11am – 7pm
              </p>
            </div>

            <div>
              <p className="label-luxury">Direct</p>
              <a
                href="mailto:atelier@megamdrapes.com"
                className="mt-4 block font-display text-xl text-foreground transition-colors duration-300 hover:text-gold"
              >
                atelier@megamdrapes.com
              </a>
              <a
                href="tel:+914442100100"
                className="mt-1 block font-body text-sm text-muted-foreground transition-colors duration-300 hover:text-gold"
              >
                +91 44 4210 0100
              </a>
            </div>

            <div>
              <p className="label-luxury">Follow</p>
              <div className="mt-4 flex flex-wrap gap-6">
                {[
                  { name: "Instagram", href: "https://instagram.com" },
                  { name: "Pinterest", href: "https://pinterest.com" },
                  { name: "Journal", href: "/journal", internal: true },
                ].map((s) =>
                  s.internal ? (
                    <Link
                      key={s.name}
                      to={s.href}
                      className="font-body text-xs uppercase tracking-[0.15em] text-foreground transition-colors duration-300 hover:text-gold"
                    >
                      {s.name}
                    </Link>
                  ) : (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-xs uppercase tracking-[0.15em] text-foreground transition-colors duration-300 hover:text-gold"
                    >
                      {s.name}
                    </a>
                  )
                )}
              </div>
            </div>

            <div className="overflow-hidden bg-surface-container">
              <iframe
                title="Atelier location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=80.265%2C13.030%2C80.275%2C13.040&layer=mapnik"
                className="h-[280px] w-full border-0 grayscale"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="space-y-10"
            noValidate
          >
            {sent ? (
              <p
                className="border border-gold/30 bg-gold/5 px-4 py-3 font-body text-sm text-foreground"
                role="status"
              >
                Message received — our atelier will respond within 24 hours.
              </p>
            ) : null}
            <FloatingInput
              id="name"
              label="Your Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              error={errors.name}
            />
            <FloatingInput
              id="email"
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              error={errors.email}
            />
            <FloatingInput
              id="message"
              label="Your Enquiry"
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              error={errors.message}
              textarea
            />
            <button
              type="submit"
              disabled={submitting}
              className="group relative inline-flex items-center gap-3 bg-primary px-8 py-4 font-body text-xs uppercase tracking-[0.15em] text-on-primary transition-opacity duration-400 hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send Enquiry"}
              <span className="transition-transform duration-400 group-hover:translate-x-1">→</span>
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
