import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxImage({ src, alt, speed = 0.3 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}px`, `${speed * 100}px`]);

  return (
    <div ref={ref} className="h-full min-h-full w-full overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="h-full w-full scale-110 object-cover"
        loading="lazy"
        width={1024}
        height={1024}
      />
    </div>
  );
}
