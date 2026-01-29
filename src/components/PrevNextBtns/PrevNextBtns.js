import './style.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addDogs, setSearchQueries } from '../../slicers'
import { Button } from '../Buttons'
import { baseURL } from '../../constants'

export function PrevNextBtns() {
  const dispatch = useDispatch()
  const { prevSearchQuery, nextSearchQuery } = useSelector(state => state.dogs)

  const config = { withCredentials: true }

  async function onBtnClick(searchQuery) {
    try {
      // 1️⃣ fetch the current page
      const { data: searchData } = await axios.get(`${baseURL}${searchQuery}`, config)

      // 2️⃣ fetch dogs and next page in parallel
      const fetchDogs = axios.post(`${baseURL}/dogs`, searchData.resultIds, config)
      const fetchNextData = axios.get(`${baseURL}${searchData.next}`, config)
      const [dogsResponse, nextDataResponse] = await Promise.all([fetchDogs, fetchNextData])

      // 3️⃣ update redux store
      dispatch(addDogs(dogsResponse.data))
      dispatch(setSearchQueries({
        prevSearchQuery: searchData.prev,
        nextSearchQuery: nextDataResponse.data.resultIds.length ? searchData.next : ''
      }))
    } catch (err) {
      console.error("Error fetching dogs or search pages:", err)
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
