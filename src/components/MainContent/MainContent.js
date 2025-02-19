import { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'
import { DogSearch } from '../DogSearch'
import { Dog } from '../Dog'
import { PrevNextButton } from '../Buttons'
import { baseURL } from '../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
export function MainContent ({ isLoggedIn }) {
  const [dogs, setDogs] = useState([])
  const [likedDogs, setLikedDogs] = useState([])
  const [nextSearchQuery, setNextSearchQuery] = useState('')
  const [prevSearchQuery, setPrevSearchQuery] = useState('')


  useEffect(() => {
    if (!isLoggedIn) {
      setDogs([])
      setLikedDogs([])
    }
  },[isLoggedIn])

  function handleClick (dogId) {
    setLikedDogs(likedDogs => {
      // unlike a dog
      if (likedDogs.find(likedDog => likedDog === dogId)) {
        return likedDogs.filter(likedDog => likedDog !== dogId)
      }
      return [...likedDogs, dogId]
    })
  }

  async function onNextButtonClick () {
    console.log(nextSearchQuery)
    if (nextSearchQuery) {
      const { data: searchData } = await axios.get(`${baseURL}${nextSearchQuery}`, 
        { withCredentials: true }
      )
      console.log('next button', searchData)
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
        ? 'Sign in and find a loveing dog to adopt.' 
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
          <p className={'liked-dogs-container'}>
            <span id='liked-dogs-counter'>{likedDogs.length}</span>
            <FontAwesomeIcon icon={faHeart} color='red' size='3x' />
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
            id={dog.id}
            handleClick={handleClick}
            image={dog.img}
            name={dog.name}
            age={dog.age}
            breed={dog.breed}
            zipCode={dog.zip_code}
            isLiked={likedDogs.find(likedDog => likedDog === dog.id)}
          />)
        }
      </ol>
    </main> 
  )
}
