import './style.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addDogs, setNextSearchQuery, setPrevSearchQuery } from '../../slicers'
import { Button } from '../Buttons'
import { baseURL } from '../../constants'

export function PrevNextBtns () {
  const dispatch = useDispatch()
  const nextSearchQuery = useSelector(state => state.searchQueries.nextSearchQuery)
  const prevSearchQuery = useSelector(state => state.searchQueries.prevSearchQuery)

  const config = {
    withCredentials: true
  }
  
async function onBtnClick (searchQuery) {
  try {
    const { data: searchData } = await axios.get(`${baseURL}${searchQuery}`, config)

    dispatch(setNextSearchQuery(searchData.next))
    dispatch(setPrevSearchQuery(searchData.prev))

    const { data: dogsData } = await axios.post(`${baseURL}/dogs`,searchData.resultIds, config)

    dispatch(addDogs(dogsData));
  } catch (err) {
    console.error("Error fetching dogs:", err);
  }
}

  return (
    <nav className={`previous-next-container`} aria-label="Search results navigation">
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
