import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addLikedDog, removeLikedDog } from '../../slicers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './style.css'

function DogModel ({ dog, children }) {
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
      {children}
    </li>
  )
}

function Dog ({ dog }) {
  const dispatch = useDispatch()
  let likedDogs = useSelector(state => state.dogsAndLikedDogs.likedDogs)
  let storedLikedDogs = JSON.parse(sessionStorage.getItem('likedDogs')) || []
  if (storedLikedDogs.length) {
    likedDogs = storedLikedDogs
  }
  const isLiked = likedDogs.some(likedDog => likedDog.id === dog.id)
  const heartColor = isLiked ? 'red-heart' : 'gray-heart'  
  const btnState = !isLiked && likedDogs.length === 10 ? 'disabled' : ''


  function onDogHeartClick (dog) {
    if (!isLiked) {
      dispatch(addLikedDog(dog))
      storedLikedDogs.push(dog)
    } else {
      dispatch(removeLikedDog(dog))
      storedLikedDogs = storedLikedDogs.filter(likedDog => likedDog.id !== dog.id)
    }
    sessionStorage.setItem('likedDogs', JSON.stringify(storedLikedDogs))
  }

  return ( 
    <DogModel dog={dog}>
      <FontAwesomeIcon 
        icon={faHeart} 
        className={`heart ${heartColor} ${btnState}`} 
        onClick={() => { onDogHeartClick(dog) }}
      />
    </DogModel>
  )
}

function MatchedDog ({ dog }) {
  return ( 
    <DogModel dog={dog}>
      <FontAwesomeIcon 
        icon={faHeart} 
        className='heart red-heart cursor-auto'
      />
    </DogModel>
  )
}
export { Dog, MatchedDog }
