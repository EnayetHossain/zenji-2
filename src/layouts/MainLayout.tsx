import MarqueeComponent from "@/components/MarqueeComponent";
import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <MarqueeComponent />
      <footer>footer</footer>
    </div>
  )
}

export default MainLayout;
