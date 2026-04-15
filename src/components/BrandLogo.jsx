import TextLogo from "@/components/TextLogo";

/**
 * @param {{
 *   variant?: 'text' | 'full' | 'monogram' | 'mark',
 *   theme?: 'light' | 'dark',
 *   className?: string,
 *   height?: number,
 * }} props
 */
export default function BrandLogo({ variant = "text", theme = "light", className = "", height }) {
  const style = height ? { height, width: "auto" } : undefined;

  if (variant === "text") {
    return <TextLogo theme={theme} className={className} />;
  }

  const src =
    variant === "mark"
      ? "/brand/megam-drapes-mark.svg"
      : variant === "monogram"
        ? theme === "dark"
          ? "/brand/megam-drapes-monogram-dark.svg"
          : "/brand/megam-drapes-monogram.svg"
        : theme === "dark"
          ? "/brand/megam-drapes-logo-full-dark.svg"
          : "/brand/megam-drapes-logo-full.svg";

  return (
    <img src={src} alt="Megam Drapes" decoding="async" className={className} style={style} />
  );
}
