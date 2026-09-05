import MarqueeComponent from "@/components/MarqueeComponent";
import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div>
      <MarqueeComponent />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  )
}

export default MainLayout;
