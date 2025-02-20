import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/global-style.css'
import { Navbar } from './components/Navbar'
import { DogsSearchList } from './components/DogsSearchList'
import { LikedDogs } from './components/LikedDogs'

export function App() {
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
    <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} likedDogs={likedDogs}/>
    <Router>
      <Routes>
        <Route
          path='fetch/' 
          element={<DogsSearchList 
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
      </Routes>
    </Router>
    </>
  )
}
