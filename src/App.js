import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/global-style.css'
import { Navbar } from './components/Navbar'
import { DogsSearchList } from './components/DogsSearchList'
import { LikedDogs } from './components/LikedDogs'
import { MatchedDog } from './components/MatchedDog'

export function App() {
  const [nextSearchQuery, setNextSearchQuery] = useState('')
  const [prevSearchQuery, setPrevSearchQuery] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [likedDogs, setLikedDogs] = useState([])
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    if (!isLoggedIn) {
      setDogs([])
      setLikedDogs([])
    }
  }, [isLoggedIn])

  return (
    <>
    <Router>
    <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} likedDogs={likedDogs} />
      <Routes>
        <Route
          path='fetch/' 
          element={<DogsSearchList
            nextSearchQuery={nextSearchQuery}
            setNextSearchQuery={setNextSearchQuery}
            prevSearchQuery={prevSearchQuery}
            setPrevSearchQuery={setPrevSearchQuery}
            dogs={dogs}
            setDogs={setDogs}
            likedDogs={likedDogs} 
            setLikedDogs={setLikedDogs} 
            isLoggedIn={isLoggedIn} />} 
          />
        <Route 
          path='fetch/liked-dogs' 
          element={<LikedDogs  likedDogs={likedDogs} setLikedDogs={setLikedDogs} />}
        />
        <Route 
          path='fetch/matched-dog' 
          element={<MatchedDog />}
        />    
      </Routes>
    </Router>
    </>
  )
}
