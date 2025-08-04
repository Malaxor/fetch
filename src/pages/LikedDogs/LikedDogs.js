import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DogList } from '../../components/DogList'
import { Button } from '../../components/Buttons'
import { baseURL } from '../../constants'

export function LikedDogs () {
  const navigate = useNavigate()
  const likedDogs  = useSelector(state => state.likedDogs.likedDogs)

  async function handleMatchSubmit () {
    try {
      const payload = likedDogs.map(dog => dog.id)
      const { data } = await axios.post(`${baseURL}/dogs/match`, payload, { withCredentials: true })
      const matchedDog = likedDogs.find(dog => dog.id === data.match)

      if (matchedDog) {
        navigate('/fetch/matched-dog', { state: { matchedDog } })
      } else {
        console.warn('Matched dog not found in likedDogs list')
      }
    } catch (error) {
      console.error('Error matching with dog:', error)
    }
  }
  
  return ( 
    <section id='liked-dogs'>
      <p id="message-for-user">Click on Submit to match with a dog.</p>
      <>
        <Button
          styling='btn form-btn match-dog-btn'
          disabled={!likedDogs.length}
          onClick={handleMatchSubmit}
        >
          Submit  
        </Button>
        <Link className='link' to='/fetch/dog-search-list'>Go Back</Link>
      </>
      <DogList dogs={likedDogs} />
    </section> 
  )
}
