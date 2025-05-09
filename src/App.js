import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/global-style.css'
import { Navbar } from './components/Navbar'
import { DogsSearchList } from './pages/DogsSearchList'
import { LikedDogs } from './pages/LikedDogs'
import { MatchedDog } from './pages/MatchedDog'

export function App() {
  const [entries] = performance.getEntriesByType("navigation")
  const { type: navigationType } = entries
  if (navigationType === 'reload') {
    window.location = '/'
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='fetch/dog-search-list' element={<DogsSearchList />} />
        <Route path='fetch/liked-dogs' element={<LikedDogs />} />
        <Route path='fetch/matched-dog' element={<MatchedDog />}/>    
      </Routes>
    </Router>
  )
}
