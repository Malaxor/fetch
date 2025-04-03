import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setNextSearchQuery, setPrevSearchQuery, addDogs } from '../../slicers'
import './style.css'
import { Button } from '../Buttons'
import { baseURL } from '../../constants'

export function PrevNextBtns () {
  const dispatch = useDispatch()
  const nextSearchQuery = useSelector(state => state.searchQueries.nextSearchQuery)
  const prevSearchQuery = useSelector(state => state.searchQueries.prevSearchQuery)

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

      dispatch(setNextSearchQuery(data.next))
      dispatch(setPrevSearchQuery(data.prev))

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

      dispatch(setNextSearchQuery(data.next))
      dispatch(setPrevSearchQuery(data.prev))

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
