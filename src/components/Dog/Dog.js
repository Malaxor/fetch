import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './style.css'

function Dog ({ dog, setLikedDogs, likedDogs }) {
  const isLiked = likedDogs.find(likedDog => likedDog.id === dog.id)

  function onDogHeartClick (dog) {
    setLikedDogs((likedDogs) => {
      // unlike a dog
      if (likedDogs.find(likedDog => likedDog.id === dog.id)) {
        return likedDogs.filter(likedDog => likedDog.id !== dog.id)
      }
      // can only like 25 dogs
      if (likedDogs.length < 25) {
        return [...likedDogs, dog]
      } else {
        return [...likedDogs]
      }
    })
  }
  const heartColor = isLiked ? 'red' : 'gray'
  
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
        className={`heart ${heartColor}`} 
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
        className='matched-dog heart red'
      />
    </li>
  )
}
export { Dog, MatchedDog }
