import './style.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addDogs, setSearchQueries } from '../../slicers'
import { Button } from '../Buttons'
import { baseURL } from '../../constants'

export function PrevNextBtns () {
  const dispatch = useDispatch()
  const { prevSearchQuery, nextSearchQuery } = useSelector(state => state.searchQueries)

  const config = {
    withCredentials: true
  }
  
  async function onBtnClick (searchQuery) {
    try {
      const { data: searchData } = await axios.get(`${baseURL}${searchQuery}`, config)

      const { data: nextSearchData } = await axios.get(`${baseURL}${searchData.next}`, config)
      dispatch(setSearchQueries({ 
        nextSearchQuery: nextSearchData.resultIds.length ? searchData.next : '',
        prevSearchQuery: searchData.prev 
      }))

      const { data: dogs } = await axios.post(`${baseURL}/dogs`, searchData.resultIds, config)

      dispatch(addDogs(dogs))
    } catch (err) {
      console.error("Error fetching dogs:", err)
    }
  }

  return (
    <nav className='previous-next-container' aria-label="Search results navigation">
      <Button
        styling='prev-next-btn'
        disabled={!prevSearchQuery}
        onClick={() => onBtnClick(prevSearchQuery)} 
      >
        Previous
      </Button>
      <Button
        styling='prev-next-btn'
        disabled={!nextSearchQuery}
        onClick={() => onBtnClick(nextSearchQuery)} 
      >
        Next
      </Button>
    </nav>
  )
}
