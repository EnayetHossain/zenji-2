import MarqueeComponent from "@/components/MarqueeComponent";
import Navbar from "@/components/shared/Navbar";
import SmoothScroll from "../components/SmoothScroll";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <SmoothScroll>
        <MarqueeComponent />
        <main>
          <Outlet />
        </main>
        <footer>footer</footer>
      </SmoothScroll>
    </div>
  )
}

export default MainLayout
