import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { DogList } from '../DogList'
import { Button } from '../Buttons'
import { baseURL } from '../../constants'

export function LikedDogs ({ setLikedDogs, likedDogs }) {
  const navigate = useNavigate()
  
  async function onMatchWithDog () {
    const payload = likedDogs.map(likedDog => likedDog.id)
    try {
      const { data } = await axios.post(`${baseURL}/dogs/match`, payload, { withCredentials: true })
      const matchedDog = likedDogs.find(likedDog => likedDog.id === data.match)
      navigate('/fetch/matched-dog', { state: { matchedDog }})
    } catch (err) {
      console.log(err)
    }
  }
  
  return ( 
    <section id='liked-dogs'>
      <p id="message-for-user">Click on Submit to match with a dog.</p>
      <>
        <p id='liked-dogs-btn-container'>
            <Button
              type='btn form-btn'
              disabled={!likedDogs.length}
              content='Submit'
              onClick={onMatchWithDog}
            />
        </p>
        <Link className='link' to='/fetch'>Go Back</Link>
      </>
      <DogList
        dogs={likedDogs}
        likedDogs={likedDogs}
        setLikedDogs={setLikedDogs} 
      />
    </section> 
  )
}
