import { useState } from 'react'
import './style/global-style.css'
import { Navbar } from './components/Navbar'
import { MainContent } from './components/MainContent'

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [likedDogs, setLikedDogs] = useState([])

  return (
    <>
      <Navbar
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        likedDogs={likedDogs}
      />
      <MainContent
        likedDogs={likedDogs}
        setLikedDogs={setLikedDogs}
        isLoggedIn={isLoggedIn}
      />
    </>
  )
}
