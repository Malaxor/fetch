import { useState } from 'react'
import './style.css'
import { DogSearch } from '../DogSearch'
import { DogList } from '../DogList'
import { FormButton } from '../Buttons'
import { SearchResultsPrevNextBtns } from '../PrevNextBtns'
import { useNavigate } from 'react-router-dom';

export function DogsSearchList ({ 
  isLoggedIn, 
  setLikedDogs, 
  likedDogs,
  dogs,
  setDogs 
}) {
  const [nextSearchQuery, setNextSearchQuery] = useState('')
  const [prevSearchQuery, setPrevSearchQuery] = useState('')

  const navigate = useNavigate()

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
        <p id='liked-dogs-btn-container'>
          <FormButton
            wide='wide'
            disabled={!likedDogs.length} 
            content={`${likedDogs.length} Liked Dogs`}
            onClick={() => navigate('liked-dogs')}
          />
        </p>
        {dogs.length > 0 && 
          <SearchResultsPrevNextBtns
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
