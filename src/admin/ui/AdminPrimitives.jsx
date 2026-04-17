import { motion } from "framer-motion";

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-10 flex flex-col gap-4 border-b border-border/40 pb-8 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? <p className="label-luxury">{eyebrow}</p> : null}
        <h1 className="mt-2 font-display text-4xl text-foreground md:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-xl font-body text-sm text-muted-foreground md:text-base">{description}</p>
        ) : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-3">{action}</div> : null}
    </div>
  );
}

export function StatCard({ label, value, sub, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      className="bg-surface-container p-6"
    >
      <p className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <p className="mt-3 font-display text-3xl text-foreground md:text-4xl">{value}</p>
      {sub ? <p className="mt-2 font-body text-xs text-muted-foreground">{sub}</p> : null}
    </motion.div>
  );
}

export function Section({ title, children, action }) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="font-display text-2xl text-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

const pillMap = {
  success: "bg-secondary/15 text-secondary-foreground",
  warn: "bg-gold-bright/25 text-primary",
  danger: "bg-destructive/10 text-destructive",
  info: "bg-primary/10 text-primary",
  neutral: "bg-surface-highest text-muted-foreground",
};

export function Pill({ tone = "neutral", children }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 font-body text-[0.65rem] uppercase tracking-[0.15em] ${pillMap[tone] || pillMap.neutral}`}
    >
      {children}
    </span>
  );
}

export function PrimaryButton({ children, onClick, type = "button", disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center bg-primary px-6 py-3 font-body text-xs uppercase tracking-[0.15em] text-on-primary transition-opacity duration-300 hover:opacity-90 disabled:opacity-40"
    >
      {children}
    </button>
  );
}
