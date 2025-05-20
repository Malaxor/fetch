import './style.css'
import { Dog, MatchedDog } from '../Dog'

export function DogList ({ dogsAndLikedDogs, matchedDog }) {
  const Dogs = dogsAndLikedDogs?.map(dog => <Dog key={dog.id} dog={dog} />)

  return (
    <ol id='dog-list'>
      {Dogs || <MatchedDog key={matchedDog.id} dog={matchedDog} />}
    </ol>
  )
}
