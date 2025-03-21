import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './style.css'

function Dog ({ dog, setLikedDogs, likedDogs }) {
  const isLiked = likedDogs.find(likedDog => likedDog.id === dog.id)

  function onDogHeartClick (dog) {
    setLikedDogs((likedDogs) => {
      // unlike a dog
      if (isLiked) {
        return likedDogs.filter(likedDog => likedDog.id !== dog.id)
      }
      // can only like 25 dogs
      if (likedDogs.length < 25) {
        return likedDogs.concat(dog)
      } else {
        return likedDogs
      }
    })
  }
  const heartColor = isLiked ? 'red-heart' : 'gray-heart'  
  const cursorType = !isLiked && likedDogs.length === 25 ? 'cursor-auto' : ''

  return ( 
    <li className='dog'>
      <img 
        className='dog__image' 
        src={dog.img} 
        alt={`a ${dog.age}-year-old ${dog.breed} named ${dog.name}`}
       />
      <ul className='dog__details'>
        <li>Breed - {dog.breed}</li>
        <li>Name - {dog.name}</li>
        <li>Age - {dog.age}</li>
        <li>Zip - {dog.zip_code}</li>
      </ul>
      <FontAwesomeIcon 
        icon={faHeart} 
        className={`heart ${heartColor} ${cursorType}`} 
        onClick={() => onDogHeartClick(dog)}
      />
    </li>
  )
}
function MatchedDog ({ dog }) {
  return ( 
    <li className='dog'>
      <img 
        className='dog__image' 
        src={dog.img} 
        alt={`a ${dog.age}-year-old ${dog.breed} named ${dog.name}`}
       />
      <ul className='dog__details'>
        <li>Breed - {dog.breed}</li>
        <li>Name - {dog.name}</li>
        <li>Age - {dog.age}</li>
        <li>Zip - {dog.zip_code}</li>
      </ul>
      <FontAwesomeIcon 
        icon={faHeart} 
        className='heart red-heart cursor-auto'
      />
    </li>
  )
}
export { Dog, MatchedDog }
