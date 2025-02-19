import { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'
import { DogSearch } from '../DogSearch'
import { Dog } from '../Dog'
import { PrevNextButton, FormButton } from '../Buttons'
import { baseURL } from '../../constants'

export function MainContent ({ isLoggedIn, setLikedDogs, likedDogs }) {
  const [dogs, setDogs] = useState([])
  const [nextSearchQuery, setNextSearchQuery] = useState('')
  const [prevSearchQuery, setPrevSearchQuery] = useState('')

  useEffect(() => {
    if (!isLoggedIn) {
      setDogs([])
      setLikedDogs([])
    }
  }, [isLoggedIn])

  function onDogHeartClick (dog) {
    setLikedDogs(likedDogs => {
      // unlike a dog
      if (likedDogs.find(likedDog => likedDog.id === dog.id)) {
        return likedDogs.filter(likedDog => likedDog.id !== dog.id)
      }
      return [...likedDogs, dog]
    })
  }

  async function onNextButtonClick () {
    if (nextSearchQuery) {
      const { data: searchData } = await axios.get(`${baseURL}${nextSearchQuery}`, 
        { withCredentials: true }
      )
      setNextSearchQuery(searchData.next ? searchData.next : '')
      setPrevSearchQuery(searchData.prev ? searchData.prev : '')
      const { data } = await axios
        .post(`${baseURL}/dogs`, searchData.resultIds, { withCredentials: true })
      setDogs(data)
    }
  }

  async function onPrevButtonClick () {
    if (prevSearchQuery) {
      const { data: searchData } = await axios.get(`${baseURL}${prevSearchQuery}`, 
        { withCredentials: true }
      )
      setNextSearchQuery(searchData.next ? searchData.next : '')
      setPrevSearchQuery(searchData.prev ? searchData.prev : '')
      const { data } = await axios
        .post(`${baseURL}/dogs`, searchData.resultIds, { withCredentials: true })
      setDogs(data)
    }  
  }

  return ( 
    <main id='main-content'>
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
              content={`Liked Dogs ${likedDogs.length}`}
            />
          </p>
          <p className={`previous-next-container ${!dogs.length ? 'hidden' : ''}`}>
            <PrevNextButton
              disabled={prevSearchQuery ? false : true}
              content='Previous'
              onPrevButtonClick={onPrevButtonClick} 
            />
            <PrevNextButton
              disabled={nextSearchQuery ? false : true}
              content='Next'
              onNextButtonClick={onNextButtonClick} 
            />
          </p>
        </>
      }
      <ol id='dog-list'>
        {dogs.map(dog =>
          <Dog
            key={dog.id}
            dog={dog}
            onDogHeartClick={onDogHeartClick}
            isLiked={likedDogs.find(likedDog => likedDog.id === dog.id)}
          />)
        }
      </ol>
    </main> 
  )
}
