import MarqueeComponent from "@/components/MarqueeComponent";
import Navbar from "@/components/shared/Navbar";
import SmoothScroll from "../components/SmoothScroll";
import { Outlet } from "react-router";
import Footer from "@/components/Footer";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <SmoothScroll>
        <MarqueeComponent />
        <main>
          <Outlet />
        </main>
        <Footer />
      </SmoothScroll>
    </div>
  )
}

export default MainLayout
