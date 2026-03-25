import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App'
import background from './pictures/background.jpg'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <img src={background} alt="Background" className="fixed top-0 left-0 w-full h-full object-cover -z-10 opacity-50"/>
    <div className="h-screen overflow-hidden">
      <App />
    </div>
  </StrictMode>,
)
