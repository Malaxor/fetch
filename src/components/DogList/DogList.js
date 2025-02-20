import React from 'react'
import './style.css'
import { Dog } from '../Dog'

export function DogList ({ dogs, likedDogs, setLikedDogs }) {
  return (
    <ol id='dog-list'>
      {dogs.map(dog =>
        <Dog
          key={dog.id}
          dog={dog}
          setLikedDogs={setLikedDogs}
          likedDogs={likedDogs}
        />)
      }
    </ol>
  )
}
