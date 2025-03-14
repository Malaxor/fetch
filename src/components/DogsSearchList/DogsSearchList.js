import { Link } from 'react-router-dom'
import './style.css'
import { DogSearch } from '../DogSearch'
import { DogList } from '../DogList'
import { PrevNextBtns } from '../PrevNextBtns'

export function DogsSearchList ({ 
  isLoggedIn, 
  setLikedDogs, 
  likedDogs,
  dogs,
  setDogs,
  nextSearchQuery, 
  setNextSearchQuery,
  prevSearchQuery, 
  setPrevSearchQuery
}) {

  return ( 
    <section id='dogs-search-list'>
      <p id="message-for-user">{!isLoggedIn 
        ? 'Sign in and find a loving dog to adopt.' 
        : 'Omitting all the search parameters will return results.'}
      </p>
      {isLoggedIn && 
      <>
        <DogSearch
          isLoggedIn={isLoggedIn}
          setDogs={setDogs}
          setNextSearchQuery={setNextSearchQuery}
          setPrevSearchQuery={setPrevSearchQuery}
        />
        <Link className={`link ${!likedDogs.length ? 'disabled' :''}`} to='liked-dogs'>
          {`View Liked Dogs ${likedDogs.length}`} 
        </Link>
        {dogs.length > 0 && 
          <PrevNextBtns
            setDogs={setDogs}
            setNextSearchQuery={setNextSearchQuery}
            setPrevSearchQuery={setPrevSearchQuery} 
            prevSearchQuery={prevSearchQuery}
            nextSearchQuery={nextSearchQuery}
          />}
      </>}
      <DogList
        dogs={dogs}
        likedDogs={likedDogs}
        setLikedDogs={setLikedDogs} 
      />
    </section> 
  )
}
