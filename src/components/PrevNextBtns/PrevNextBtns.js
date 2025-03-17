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
      let data
      try {
        const res = await axios.get(`${baseURL}${nextSearchQuery}`, config)
        data = res.data
      } catch (err) {
        console.log(err)
      }
      setNextSearchQuery(data.next)
      setPrevSearchQuery(data.prev)
      try {
        const res = await axios.post(`${baseURL}/dogs`, data.resultIds, config)
        data = res.data  
      } catch (err) {
        console.log(err)
      }
      setDogs(data)
    }
  }

  async function onPrevButtonClick () {
    if (prevSearchQuery) {
      let data
      try {
        const res = await axios.get(`${baseURL}${prevSearchQuery}`, config)
        data = res.data
      } catch (err) {
        console.log(err)
      }
      setNextSearchQuery(data.next)
      setPrevSearchQuery(data.prev)
      try {
        const res = await axios.post(`${baseURL}/dogs`, data.resultIds, config)
        data = res.data  
      } catch (err) {
        console.log(err)
      }
      setDogs(data)
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
