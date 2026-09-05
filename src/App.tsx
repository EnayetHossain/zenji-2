import './App.css'
import { RouterProvider } from 'react-router'
import router from './routes/router'
import { ScrollProvider } from './context/ScrollContext'

function App() {
  return (
    <ScrollProvider>
      <RouterProvider router={router} />
    </ScrollProvider>
  )
}

export default App
