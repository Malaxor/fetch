import './style.css'
import { useSelector } from 'react-redux'
import { PuffLoader } from 'react-spinners'
import { Dog, MatchedDog } from '../Dog'

export function DogList({ dogs = [], matchedDog }) {
  const loading = useSelector((state) => state.loading.loading)
  const hasDogs = dogs.length > 0

  return (
    <ol id="dog-list">
      {loading && (
        <PuffLoader color="#fba919" size={150} cssOverride={{ margin: '0 auto' }} />
      )}

      {hasDogs && !loading && dogs.map((dog) => (
        <Dog key={dog.id} dog={dog} />
      ))}

      {matchedDog && (
        <MatchedDog key={matchedDog.id} dog={matchedDog} />
      )}
    </ol>
  )
}
