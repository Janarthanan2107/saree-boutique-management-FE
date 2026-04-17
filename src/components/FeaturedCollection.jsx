import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getCatalogProductById, getSettings } from "@/admin/data/adminApi";
import { useAdminSync } from "@/admin/hooks/useAdminSync";

const DEFAULT_IDS = ["banarasi-crimson", "royal-kanjeevaram", "emerald-pattu"];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function FeaturedCollection() {
  const v = useAdminSync();
  const collections = useMemo(() => {
    const s = getSettings();
    const ids = (s.featuredProductIds || []).length ? s.featuredProductIds : DEFAULT_IDS;
    return ids.map((id) => getCatalogProductById(id)).filter(Boolean).slice(0, 6);
  }, [v]);

  return (
    <section className="bg-surface-container px-6 py-24 md:px-16 md:py-32 lg:px-[120px] lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 flex flex-col gap-4 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-luxury mb-3">Curated Selections</p>
            <h2 className="font-display text-3xl tracking-[-0.02em] text-foreground md:text-4xl lg:text-[2.5rem]">
              The Collection
            </h2>
          </div>
          <Link to="/collections" className="gold-link self-start md:self-auto">
            View All Sarees
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {collections.map((item, i) => (
            <motion.article
              key={item.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className={`group ${i === 1 ? "lg:mt-16" : ""}`}
            >
              <Link to={`/collections/${item.id}`} className="block cursor-pointer">
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5">
                  <p className="label-luxury mb-1.5">{item.category}</p>
                  <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                  <p className="mt-1 font-body text-sm text-muted-foreground">{item.price}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
