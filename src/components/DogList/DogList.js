import './style.css'
import { useSelector } from 'react-redux'
import { PuffLoader } from 'react-spinners'
import { Dog, MatchedDog } from '../Dog'

export function DogList({ dogs = [], matchedDog }) {
  const loading = useSelector((state) => state.loading.loading)
  const hasDogs = useSelector(state => state.hasDogs.hasDogs)

  if (loading) {
    return <PuffLoader color="#fba919" size={150} cssOverride={{ margin: '0 auto' }} />
  }

  if (hasDogs === false) {
    return <p id="no-dogs-found-msg">No dogs found.</p>
  }

  return (
    <ol id="dog-list">
      {matchedDog && <MatchedDog key={matchedDog.id} dog={matchedDog} />}
      {dogs.map((dog) => <Dog key={dog.id} dog={dog} />)}
    </ol>
  )
}