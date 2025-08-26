import { useLocation } from 'react-router-dom'
import { DogList } from '../../components/DogList'

export function MatchedDog () {
  let { state: { matchedDog } } = useLocation()
  
  return ( 
    <div id='matched-dog' role="region" aria-labelledby="message-for-user">
      <p id="message-for-user">{`You've matched with ${matchedDog.name}! `}</p>
      <DogList matchedDog={matchedDog} />
    </div> 
  )
}
