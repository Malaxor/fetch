import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addDogs } from '../../slicers'
import './style.css'
import { Button } from '../Buttons'
import { baseURL } from '../../constants'

export function PrevNextBtns ({ 
  searchQueries: { 
    nextSearchQuery, 
    prevSearchQuery 
  }, 
  setSearchQueries 
}) {
  const dispatch = useDispatch()
  
  const config = {
    withCredentials: true
  }
  
  async function onNextButtonClick () {
    if (nextSearchQuery) {
      let data
      try {
        const res = await axios.get(`${baseURL}${nextSearchQuery}`, config)
        data = res.data
      } catch (err) {
        console.log(err)
      }

      setSearchQueries(searchQueries => (
        {
          prevSearchQuery: data.prev,
          nextSearchQuery: data.next
        }
      ))

      try {
        const res = await axios.post(`${baseURL}/dogs`, data.resultIds, config)
        data = res.data  
      } catch (err) {
        console.log(err)
      }

      dispatch(addDogs(data))
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

      setSearchQueries(searchQueries => (
        {
          prevSearchQuery: data.prev,
          nextSearchQuery: data.next
        }
      ))

      try {
        const res = await axios.post(`${baseURL}/dogs`, data.resultIds, config)
        data = res.data  
      } catch (err) {
        console.log(err)
      }

      dispatch(addDogs(data))
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
