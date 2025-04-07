import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './style.css'
import { DogSearch } from '../DogSearch'
import { DogList } from '../DogList'
import { PrevNextBtns } from '../PrevNextBtns'

export function DogsSearchList () {
  const dogs = useSelector(state => state.dogsAndLikedDogs.dogs)
  const likedDogs = useSelector(state => state.dogsAndLikedDogs.likedDogs)
  const [searchQueries, setSearchQueries] = useState({
    prevSearchQuery: '',
    nextSearchQuery: ''
  })

  return ( 
    <section id='dogs-search-list'>
      <p id="message-for-user">Omitting all search parameters returns results.</p>
      <>
        <DogSearch setSearchQueries={setSearchQueries}/>
        <Link className={`link ${!likedDogs?.length ? 'disabled' :''}`} to='/fetch/liked-dogs'>
          {`View Liked Dogs ${likedDogs?.length}`} 
        </Link>
        {dogs.length > 0 && <PrevNextBtns searchQueries={searchQueries} setSearchQueries={setSearchQueries}/>}
      </>
      <DogList dogs={dogs} />
    </section> 
  )
}
