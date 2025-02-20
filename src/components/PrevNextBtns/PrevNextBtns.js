import React from 'react'
import axios from 'axios'
import './style.css'
import { PrevNextButton } from '../Buttons'
import { baseURL } from '../../constants'

function PrevNextBtns ({ 
  setDogs,
  likedDogs,
  setNextSearchQuery,
  setPrevSearchQuery,
  prevSearchQuery, 
  nextSearchQuery,
}) {

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
    <p className={`previous-next-container`}>
      <PrevNextButton
        disabled={prevSearchQuery ? false : true}
        content='Previous'
        onClick={onPrevButtonClick} 
      />
      <PrevNextButton
        disabled={nextSearchQuery ? false : true}
        content='Next'
        onClick={onNextButtonClick} 
      />
    </p>
  )
}

export { PrevNextBtns }