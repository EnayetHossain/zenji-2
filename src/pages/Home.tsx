import About from "@/components/About";
import HeroSection from "@/components/HeroSection";
import Origin from "@/components/Origin";
import Products from "@/components/Products";
import Sale from "@/components/Sale";

function Home() {
  return (
    <div className="mx-auto w-full">
      <HeroSection />
      <Origin />
      <Sale />
      <Products />
      <About />
    </div>
  )
}

export default Home;
