import { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'
import { DogSearch } from '../DogSearch'
import { DogList } from '../DogList'
import { FormButton } from '../Buttons'
import { PrevNextBtns } from '../PrevNextBtns'
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

  async function onNextButtonClick () {
    if (nextSearchQuery) {
      const { data: searchData } = await axios.get(`${baseURL}${nextSearchQuery}`, 
        { withCredentials: true }
      )
      setNextSearchQuery(searchData.next)
      setPrevSearchQuery(searchData.prev)
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
      setNextSearchQuery(searchData.next)
      setPrevSearchQuery(searchData.prev)
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
            content={`${likedDogs.length} Liked Dogs`}
          />
        </p>
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
    </main> 
  )
}
