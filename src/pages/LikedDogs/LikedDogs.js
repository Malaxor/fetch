import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DogList } from '../../components/DogList'
import { Button } from '../../components/Buttons'
import { baseURL } from '../../constants'

export function LikedDogs () {
  const navigate = useNavigate()
  let likedDogs = useSelector(state => state.dogsAndLikedDogs.likedDogs)
  const storedLikedDogs = JSON.parse(sessionStorage.getItem('likedDogs'))
  likedDogs = storedLikedDogs || likedDogs

  function onMatchWithDog () {
    const payload = likedDogs.map(likedDog => likedDog.id)
    axios.post(`${baseURL}/dogs/match`, payload, { withCredentials: true })
      .then(({ data }) => {
        const matchedDog = likedDogs.find(likedDog => likedDog.id === data.match)
        sessionStorage.setItem('matchedDog', JSON.stringify(matchedDog))
        navigate('/fetch/matched-dog', { state: { matchedDog }})
      })
      .catch(err => { console.log(err) })
  }
  
  return ( 
    <section id='liked-dogs'>
      <p id="message-for-user">Click on Submit to match with a dog.</p>
      <>
        <Button
          styling='btn form-btn match-dog-btn'
          disabled={!likedDogs.length}
          content='Submit'
          onClick={onMatchWithDog}
        />
        <Link className='link' to='/fetch/dog-search-list'>Go Back</Link>
      </>
      <DogList dogsAndLikedDogs={likedDogs} />
    </section> 
  )
}
