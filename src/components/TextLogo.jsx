/**
 * Text lockup: project name + tagline — tuned for light (ivory) vs dark (maroon) surfaces.
 */
export default function TextLogo({ theme = "light", className = "" }) {
  const isDark = theme === "dark";

  const nameClass = isDark
    ? "font-body text-base font-semibold uppercase tracking-[0.2em] text-primary-foreground sm:text-lg md:text-xl"
    : "font-body text-base font-semibold uppercase tracking-[0.2em] text-primary sm:text-lg md:text-xl";

  const lineClass = isDark
    ? "mt-0.5 font-display text-[0.68rem] font-light italic leading-tight tracking-[0.03em] text-gold-bright sm:text-xs md:text-[0.5125rem]"
    : "mt-0.5 font-display text-[0.68rem] font-light italic leading-tight tracking-[0.03em] text-gold sm:text-xs md:text-[0.5125rem] [text-shadow:0_1px_0_oklch(0.97_0.015_95_/_0.85)]";

  return (
    <div
      className={`flex flex-col leading-none transition-colors duration-300 ${className}`.trim()}
    >
      <span className={nameClass}>Megam Drapes</span>
      <span className={`${lineClass} max-w-[15rem]`}>Inspired by mother&apos;s love</span>
    </div>
  );
}
