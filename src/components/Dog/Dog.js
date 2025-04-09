import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addLikedDog, removeLikedDog } from '../../slicers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './style.css'

function Dog ({ dog }) {
  const dispatch = useDispatch()
  const likedDogs = useSelector(state => state.dogsAndLikedDogs.likedDogs)
  const isLiked = likedDogs.find(likedDog => likedDog.id === dog.id)
  const heartColor = isLiked ? 'red-heart' : 'gray-heart'  
  const cursorType = !isLiked && likedDogs.length === 10 ? 'cursor-auto' : ''

  function onDogHeartClick (dog) {
    if (!isLiked) {
      dispatch(addLikedDog(dog))
    } else {
      dispatch(removeLikedDog(dog))
    }
  }

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
        onClick={() => { onDogHeartClick(dog) }}
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
