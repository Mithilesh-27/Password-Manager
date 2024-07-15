import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="absolute top-0 z-[-2] h-full w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <Navbar />
        <Manager />
        <Footer />
      </div>
    </>
  )
}

export default App
