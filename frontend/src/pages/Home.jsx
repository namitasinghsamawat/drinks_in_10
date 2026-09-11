import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import TrendingProducts from "../components/TrendingProducts";
import WhyAmberBarrel from "../components/WhyAmberBarrel";
import NearbySellers from "../components/NearbySellers";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <TrendingProducts />
      <WhyAmberBarrel />
      <NearbySellers />
      <Footer />
    </>
  );
}

export default Home;