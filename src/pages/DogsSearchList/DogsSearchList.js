import './style.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DogSearch } from '../../components/DogSearch'
import { DogList } from '../../components/DogList'
import { PrevNextBtns } from '../../components/PrevNextBtns'

export function DogsSearchList () {
  let dogs = useSelector(state => state.dogsAndLikedDogs.dogs)
  let likedDogs = useSelector(state => state.dogsAndLikedDogs.likedDogs)
  const storedLikedDogs = JSON.parse(sessionStorage.getItem('likedDogs'))
  const storedDogs = JSON.parse(sessionStorage.getItem('dogs'))
  likedDogs = storedLikedDogs || likedDogs
  dogs = storedDogs || dogs

  return ( 
    <section id='dogs-search-list'>
      <p id="message-for-user">Omitting search parameters still returns results.</p>
      <DogSearch />
      <Link className={`link ${!likedDogs.length ? 'disabled' : ''}`} to='/fetch/liked-dogs'>
        {`View Liked Dogs ${likedDogs.length}`} 
      </Link>
      {dogs.length > 0 && <PrevNextBtns />}
      <DogList dogsAndLikedDogs={dogs} />
    </section> 
  )
}
