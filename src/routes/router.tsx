import MainLayout from "@/layouts/MainLayout"
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router"

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
])

export default router;
