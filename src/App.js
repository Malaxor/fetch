import './style/global-style.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { DogsSearchList } from './pages/DogsSearchList'
import { LikedDogs } from './pages/LikedDogs'
import { MatchedDog } from './pages/MatchedDog'

export function App () {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/fetch" replace />} />
        <Route path="/pup-match-rescue/dog-search-list" element={<DogsSearchList />} />
        <Route path="/pup-match-rescue/liked-dogs" element={<LikedDogs />} />
        <Route path="/pup-match-rescue/matched-dog" element={<MatchedDog />} />
        <Route path="*" element={<Navigate to="/pup-match-rescue" replace />} />
      </Routes>
    </Router>
  )
}
