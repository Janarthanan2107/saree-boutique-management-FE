import { Link } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";

const explore = [
  { label: "Collections", to: "/collections" },
  { label: "New Arrivals", to: "/collections" },
  { label: "Heritage Weaves", to: "/heritage" },
  { label: "Bridal", to: "/collections" },
];

const atelier = [
  { label: "Our Story", to: "/heritage" },
  { label: "Artisans", to: "/atelier" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
];

const legal = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-primary px-6 py-16 md:px-16 md:py-20 lg:px-[120px]">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-block" aria-label="Megam Drapes home">
              <BrandLogo variant="text" theme="dark" />
            </Link>
            <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-primary-foreground/60">
              A curated atelier of India&apos;s finest handwoven silk sarees — where heritage meets
              modern elegance.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.1em] text-gold-bright">Explore</p>
            <ul className="flex flex-col gap-2.5">
              {explore.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="font-body text-sm text-primary-foreground/70 transition-colors duration-400 hover:text-gold-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.1em] text-gold-bright">Atelier</p>
            <ul className="flex flex-col gap-2.5">
              {atelier.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="font-body text-sm text-primary-foreground/70 transition-colors duration-400 hover:text-gold-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.1em] text-gold-bright">Legal</p>
            <ul className="flex flex-col gap-2.5">
              {legal.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="font-body text-sm text-primary-foreground/70 transition-colors duration-400 hover:text-gold-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-primary-foreground/10 pt-6 md:flex-row md:items-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © 2026 Megam Drapes. All rights reserved.
          </p>
          <p className="font-body text-xs text-primary-foreground/40">
            Handcrafted with devotion in India
          </p>
        </div>
      </div>
    </footer>
  );
}
