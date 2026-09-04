import './App.css'
import SmoothScroll from './components/SmoothScroll'
import { RouterProvider } from 'react-router'
import router from './routes/router'

function App() {
  return (
    <SmoothScroll>
      <RouterProvider router={router} />
    </SmoothScroll>
  )
}

export default App
