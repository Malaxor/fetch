import { useLocation } from 'react-router-dom'
import { DogList } from '../DogList'
export function MatchedDog () {
  const { state: { matchedDog } } = useLocation()
  return ( 
    <section id='matched-dog'>
      <p id="message-for-user">{`You've matched with ${matchedDog.name}! `}</p>
      <DogList matchedDog={matchedDog} />
    </section> 
  )
}
