import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addDogs, setNextSearchQuery, setPrevSearchQuery } from '../../slicers'
import './style.css'
import { Button } from '../Buttons'
import { baseURL } from '../../constants'

export function PrevNextBtns () {
  const dispatch = useDispatch()
  let nextSearchQuery = useSelector(state => state.searchQueries.nextSearchQuery)
  let prevSearchQuery = useSelector(state => state.searchQueries.prevSearchQuery)
  const storedNextSearchQuery = sessionStorage.getItem('nextSearchQuery')
  const storedPrevSearchQuery = sessionStorage.getItem('prevSearchQuery')
  nextSearchQuery = nextSearchQuery || storedNextSearchQuery
  prevSearchQuery = prevSearchQuery || storedPrevSearchQuery

  console.log(sessionStorage)

  const config = {
    withCredentials: true
  }
  
  async function onBtnClick (searchQuery) {
    let data
    try {
      const res = await axios.get(`${baseURL}${searchQuery}`, config)
      data = res.data
    } catch (err) {
      console.log(err)
    }

    dispatch(setNextSearchQuery(data.next))
    dispatch(setPrevSearchQuery(data.prev))
    sessionStorage.setItem('nextSearchQuery', data.next || '')
    sessionStorage.setItem('prevSearchQuery', data.prev || '')

    try {
      const res = await axios.post(`${baseURL}/dogs`, data.resultIds, config)
      data = res.data  
    } catch (err) {
      console.log(err)
    }
    sessionStorage.setItem('dogs', JSON.stringify(data))
    dispatch(addDogs(data))
  }

  return (
    <p className={`previous-next-container`}>
      <Button
        styling='prev-next-btn'
        disabled={!prevSearchQuery}
        content='Previous'
        onClick={() => { onBtnClick(prevSearchQuery) }} 
      />
      <Button
        styling='prev-next-btn'
        disabled={!nextSearchQuery}
        content='Next'
        onClick={() => { onBtnClick(nextSearchQuery) }} 
      />
    </p>
  )
}
