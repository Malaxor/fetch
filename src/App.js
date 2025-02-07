import { useState } from 'react'
import './style/global-style.css'
import { Navbar } from './components/Navbar'
import { MainContent } from './components/MainContent'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <Navbar
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
      />
      <MainContent
        isLoggedIn={isLoggedIn}
      />
    </>
  )
}

export { App }
