import React from 'react'
import axios from 'axios'
import './style.css'
import { Button } from '../Buttons'
import { baseURL } from '../../constants'

export function PrevNextBtns ({ 
  setDogs,
  setNextSearchQuery,
  setPrevSearchQuery,
  prevSearchQuery, 
  nextSearchQuery
}) {

  async function onNextButtonClick () {
    if (nextSearchQuery) {
      try {
        const { data: searchData } = await axios.get(`${baseURL}${nextSearchQuery}`, 
          { withCredentials: true }
        )
        setNextSearchQuery(searchData.next)
        setPrevSearchQuery(searchData.prev)
        const { data } = await axios
          .post(`${baseURL}/dogs`, searchData.resultIds, { withCredentials: true })
        setDogs(data)
      } catch (err) {
        console.log(err)
      }
    }
  }

  async function onPrevButtonClick () {
    if (prevSearchQuery) {
      try {
        const { data: searchData } = await axios.get(`${baseURL}${prevSearchQuery}`, 
          { withCredentials: true }
        )
        setNextSearchQuery(searchData.next)
        setPrevSearchQuery(searchData.prev)
        const { data } = await axios
          .post(`${baseURL}/dogs`, searchData.resultIds, { withCredentials: true })
        setDogs(data)
      } catch (err) {
       console.log(err) 
      }
    }  
  }
  
  return (
    <p className={`previous-next-container`}>
      <Button
        styling='prev-next-btn'
        disabled={prevSearchQuery ? false : true}
        content='Previous'
        onClick={onPrevButtonClick} 
      />
      <Button
        styling='prev-next-btn'
        disabled={nextSearchQuery ? false : true}
        content='Next'
        onClick={onNextButtonClick} 
      />
    </p>
  )
}
