import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App'
// import Headline from './examples/Headline'
// import Weather from './examples/Weather'
// import CountButton from './examples/Count-Button'
import background from './pictures/background1.jpg'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <img src={background} alt="Background" className="fixed top-0 left-0 w-full h-full object-cover -z-10 opacity-70"/>
    <App />
    {/*<Headline />
    <Weather />
    <CountButton /> */}
  </StrictMode>,
)
