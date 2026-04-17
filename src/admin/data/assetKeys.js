import heroSaree from "@/assets/hero-saree.jpg";
import sareeTexture1 from "@/assets/saree-texture-1.jpg";
import sareeTexture2 from "@/assets/saree-texture-2.jpg";
import sareeTexture3 from "@/assets/saree-texture-3.jpg";
import sareeNavy from "@/assets/saree-navy-banarasi.jpg";
import sareePink from "@/assets/saree-pink-kanjeevaram.jpg";
import sareeTeal from "@/assets/saree-teal-pattu.jpg";
import sareeIvory from "@/assets/saree-ivory-banarasi.jpg";
import sareeRed from "@/assets/saree-red-kanjeevaram.jpg";
import sareeMustard from "@/assets/saree-mustard-pattu.jpg";
import fashionEditorial from "@/assets/journal-fashion-editorial.jpg";
import bridalStory from "@/assets/journal-bridal-story.jpg";

export const ASSET_BY_KEY = {
  "hero-saree": heroSaree,
  "saree-texture-1": sareeTexture1,
  "saree-texture-2": sareeTexture2,
  "saree-texture-3": sareeTexture3,
  "saree-navy-banarasi": sareeNavy,
  "saree-pink-kanjeevaram": sareePink,
  "saree-teal-pattu": sareeTeal,
  "saree-ivory-banarasi": sareeIvory,
  "saree-red-kanjeevaram": sareeRed,
  "saree-mustard-pattu": sareeMustard,
  "journal-fashion-editorial": fashionEditorial,
  "journal-bridal-story": bridalStory,
};

export function resolveAsset(key) {
  if (!key) return sareeTexture1;
  if (typeof key === "string" && key.startsWith("data:")) return key;
  return ASSET_BY_KEY[key] ?? sareeTexture1;
}

export const BUNDLED_IMAGE_KEYS = Object.keys(ASSET_BY_KEY);
