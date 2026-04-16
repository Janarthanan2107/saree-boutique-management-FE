import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";
import artisanLoom from "@/assets/heritage-artisan-loom.jpg";
import silkThreads from "@/assets/heritage-silk-threads.jpg";
import sareeTexture1 from "@/assets/saree-texture-1.jpg";
import sareeTexture2 from "@/assets/saree-texture-2.jpg";

const timeline = [
  {
    year: "1952",
    title: "The First Loom",
    text: "Our founder, Shri Raghunath Iyer, set up a single handloom in Kanchipuram, beginning a legacy of silk artistry that would span generations.",
  },
  {
    year: "1978",
    title: "Varanasi Collaboration",
    text: "A historic partnership with Banarasi master weavers expanded our repertoire, blending South and North Indian weaving traditions.",
  },
  {
    year: "1995",
    title: "Heritage Preservation",
    text: "We established the Megam Weaver Collective, ensuring fair wages and preserving ancient techniques threatened by industrialisation.",
  },
  {
    year: "2024",
    title: "Digital Atelier",
    text: "Megam Drapes brings centuries of heritage to the modern world — a curated digital experience for discerning collectors.",
  },
];

export default function HeritagePage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <main className="bg-background">
      <Navigation />

      <section ref={heroRef} className="relative h-[85vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src={artisanLoom}
            alt="Master weaver at handloom"
            className="h-full w-full object-cover"
            width={1280}
            height={800}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </motion.div>
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative flex h-full flex-col items-center justify-end px-8 pb-24 text-center"
        >
          <span className="label-luxury mb-4">Est. 1952</span>
          <h1 className="font-display text-4xl leading-tight text-foreground md:text-6xl lg:text-7xl">
            Woven Into
            <br />
            History
          </h1>
          <p className="mt-6 max-w-lg font-body text-sm leading-relaxed text-muted-foreground md:text-base">
            Seven decades of preserving India&apos;s most revered silk weaving traditions — one thread at a time.
          </p>
        </motion.div>
      </section>

      <section className="px-8 py-32 md:px-16 lg:px-[120px]">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="label-luxury mb-6 block">Our Philosophy</span>
            <h2 className="font-display text-3xl leading-snug text-foreground md:text-4xl">Where Patience Becomes Art</h2>
            <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
              Each Megam saree is a testament to patience — the kind measured not in hours, but in weeks and months. Our
              master weavers work with the same techniques their forebears perfected centuries ago, using hand-spun silk
              threads and real gold zari.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
              We believe luxury isn&apos;t manufactured — it&apos;s cultivated. Every motif carries meaning, every
              colour tells a story, and every saree holds within it the quiet dignity of human craft.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-[3/4] overflow-hidden"
          >
            <ParallaxImage src={silkThreads} alt="Vibrant silk threads on wooden spools" speed={0.2} />
          </motion.div>
        </div>
      </section>

      <section className="bg-surface-container px-8 py-32 md:px-16 lg:px-[120px]">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <span className="label-luxury mb-4 block">The Craft</span>
            <h2 className="font-display text-3xl text-foreground md:text-5xl">The Weaving Process</h2>
          </motion.div>

          <div className="grid gap-20 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Thread Selection",
                desc: "Only the finest mulberry silk cocoons are chosen, hand-reeled into threads of extraordinary lustre and strength.",
              },
              {
                step: "02",
                title: "Dyeing & Preparation",
                desc: "Natural and heritage-formula dyes create our signature colour palette — deep maroons, royal golds, and jewel-tone greens.",
              },
              {
                step: "03",
                title: "Handloom Weaving",
                desc: "Master artisans work jacquard handlooms, interlacing silk and gold zari into intricate motifs over weeks of patient labour.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <span className="font-display text-5xl text-gold/30">{item.step}</span>
                <h3 className="mt-4 font-display text-xl text-foreground">{item.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-28 px-8 pt-8 pb-32 md:px-16 md:pt-12 lg:px-[120px]">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px" }}
            className="mb-12 text-center md:mb-16"
          >
            <span className="label-luxury mb-3 block md:mb-4">Our Journey</span>
            <h2 className="font-display text-3xl leading-[1.15] tracking-tight text-foreground md:text-5xl md:leading-tight">
              A Legacy of Silk
            </h2>
          </motion.div>

          <div className="relative">
            {/* Mobile: line + dots aligned to one axis */}
            <div
              className="absolute top-0 bottom-0 left-[15px] w-px bg-gold/25 md:hidden"
              aria-hidden
            />
            {/* Desktop: true vertical center */}
            <div
              className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-gold/25 md:block"
              aria-hidden
            />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative mb-14 last:mb-0 md:mb-16"
              >
                {/* Dot centered on line (both breakpoints) */}
                <div
                  className="absolute top-[0.35rem] left-[15px] z-10 h-[11px] w-[11px] -translate-x-1/2 rounded-full border-2 border-gold bg-background md:left-1/2 md:top-2 md:h-3 md:w-3"
                  aria-hidden
                />

                {/* Mobile: content to the right of axis */}
                <div className="pl-10 md:hidden">
                  <span className="label-luxury text-gold-bright">{item.year}</span>
                  <h3 className="mt-2 font-display text-xl text-foreground">{item.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>

                {/* Desktop: alternating columns; line stays at 50% */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-0">
                  {i % 2 === 0 ? (
                    <>
                      <div className="pr-6 text-right">
                        <span className="label-luxury text-gold-bright">{item.year}</span>
                        <h3 className="mt-2 font-display text-xl text-foreground">{item.title}</h3>
                        <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <div className="pl-6 text-left">
                        <span className="label-luxury text-gold-bright">{item.year}</span>
                        <h3 className="mt-2 font-display text-xl text-foreground">{item.title}</h3>
                        <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <ParallaxImage src={sareeTexture2} alt="Silk saree detail" speed={0.4} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-primary/50">
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl px-8 text-center"
          >
            <p className="font-display text-2xl leading-relaxed text-on-primary italic md:text-3xl">
              &ldquo;A saree is not just a garment — it is a story spun in silk, a poem woven in gold.&rdquo;
            </p>
            <cite className="mt-6 block font-body text-xs tracking-widest text-on-primary/70 uppercase">
              — Shri Raghunath Iyer, Founder
            </cite>
          </motion.blockquote>
        </div>
      </section>

      <section className="px-8 py-32 md:px-16 lg:px-[120px]">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 aspect-[4/3] overflow-hidden md:order-1"
          >
            <ParallaxImage src={sareeTexture1} alt="Handwoven silk saree close-up" speed={0.2} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <span className="label-luxury mb-6 block">Our Artisans</span>
            <h2 className="font-display text-3xl leading-snug text-foreground md:text-4xl">Guardians of the Loom</h2>
            <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
              We work with over 120 master weavers across Kanchipuram, Varanasi, and Dharmavaram. Each artisan brings
              generations of inherited skill — knowledge that cannot be taught in classrooms, only passed down at the
              loom.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-8">
              {[
                { num: "120+", label: "Artisans" },
                { num: "72", label: "Years" },
                { num: "3", label: "Heritage Regions" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="font-display text-2xl text-gold md:text-3xl">{stat.num}</span>
                  <span className="mt-1 block font-body text-xs tracking-wider text-muted-foreground uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
