import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DogList } from '../../components/DogList'
import { Button } from '../../components/Buttons'
import { fetchMachedDogId } from '../../api'

export function LikedDogs () {
  const navigate = useNavigate()
  const { likedDogs }  = useSelector(state => state.dogs)

  async function handleMatchSubmit () {
    try {
      const payload = likedDogs.map(dog => dog.id)
      const matchedDogId = await fetchMachedDogId(payload)
      const matchedDog = likedDogs.find(dog => dog.id === matchedDogId)

      if (matchedDog) {
        navigate('/PupMatch-Rescue/matched-dog', { state: matchedDog  })
      } else {
        console.warn('Matched dog not found in likedDogs list')
      }
    } catch (error) {
      console.error('Error matching with dog:', error)
    }
  }
  
  return ( 
    <div id='liked-dogs' role="region" aria-labelledby="message-for-user">
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
    </div> 
  )
}
