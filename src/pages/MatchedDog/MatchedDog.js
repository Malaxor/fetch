import { useLocation } from 'react-router-dom'
import { DogList } from '../../components/DogList'

export function MatchedDog () {
  let { state: { matchedDog } } = useLocation()
  
  return ( 
    <section id='matched-dog'>
      <p id="message-for-user">{`You've matched with ${matchedDog.name}! `}</p>
      <DogList matchedDog={matchedDog} />
    </section> 
  )
}
