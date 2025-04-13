import React from 'react'
import { Dog, MatchedDog } from '../Dog'
import './style.css'

export function DogList ({ dogsAndLikedDogs, matchedDog }) {
  const Dogs = dogsAndLikedDogs?.map(dog => <Dog key={dog.id} dog={dog} />)

  return (
    <ol id='dog-list'>
      {Dogs || <MatchedDog key={matchedDog.id} dog={matchedDog} />}
    </ol>
  )
}
