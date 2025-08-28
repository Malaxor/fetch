import './style.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DogSearch } from '../../components/DogSearch'
import { DogList } from '../../components/DogList'
import { PrevNextBtns } from '../../components/PrevNextBtns'

export function DogsSearchList () {
  const dogs = useSelector(state => state.dogs.dogs)
  const likedDogs = useSelector(state => state.likedDogs.likedDogs)

  return ( 
    <div id='dogs-search-list' role="region" aria-labelledby="message-for-user">
      <p id="message-for-user">Omitting search parameters still returns results.</p>
      <DogSearch />
      {likedDogs.length > 0 && (
        <Link className="link" to="/fetch/liked-dogs">
          View Liked Dogs {likedDogs.length}
        </Link>
      )}
      {dogs.length > 0 && <PrevNextBtns />}
      <DogList dogs={dogs} />
    </div> 
  )
}
