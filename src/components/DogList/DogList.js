import React from 'react'
import { Dog, MatchedDog } from '../Dog'
import './style.css'

export function DogList ({ dogs, matchedDog }) {
  // Dogs = dogs and liked dogs; will be undefined when rendering the matched-dog page
  const Dogs = dogs?.map(dog => <Dog key={dog.id} dog={dog} />)

  return (
    <ol id='dog-list'>
      {Dogs || <MatchedDog key={matchedDog.id} dog={matchedDog} />}
    </ol>
  )
}
