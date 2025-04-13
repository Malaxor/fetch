import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './style.css'
import { DogSearch } from '../../components/DogSearch'
import { DogList } from '../../components/DogList'
import { PrevNextBtns } from '../../components/PrevNextBtns'

export function DogsSearchList () {
  const dogs = useSelector(state => state.dogsAndLikedDogs.dogs)
  const likedDogs = useSelector(state => state.dogsAndLikedDogs.likedDogs)

  return ( 
    <section id='dogs-search-list'>
      <p id="message-for-user">Omitting all search parameters returns results.</p>
      <DogSearch />
      <Link className={`link ${!likedDogs?.length ? 'disabled' :''}`} to='/fetch/liked-dogs'>
        {`View Liked Dogs ${likedDogs?.length}`} 
      </Link>
      {dogs.length > 0 && <PrevNextBtns />}
      <DogList dogsAndLikedDogs={dogs} />
    </section> 
  )
}
