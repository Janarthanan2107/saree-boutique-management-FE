import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedCollection from "@/components/FeaturedCollection";
import EditorialSection from "@/components/EditorialSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <FeaturedCollection />
      <EditorialSection />
      <Footer />
    </main>
  );
}
