import './style.css'
import { Dog, MatchedDog } from '../Dog'

export function DogList({ dogs = [], matchedDog }) {
  const hasDogs = dogs.length > 0
  return (
    <ol id="dog-list">
      {hasDogs ? (
        dogs.map(dog => <Dog key={dog.id} dog={dog} />)
      ) : (
        matchedDog && <MatchedDog key={matchedDog.id} dog={matchedDog} />
      )}
    </ol>
  )
}
