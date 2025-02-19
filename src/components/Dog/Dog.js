import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './style.css'

export function Dog ({ dog, onDogHeartClick, isLiked }) {
  return ( 
    <li className='dog'>
      <img 
        className='dog__image' 
        src={dog.img} 
        alt={`a ${dog.age}-year-old ${dog.breed} named ${dog.name}`}
       />
      <ul className='dog__details'>
        <li className='dog__detail--breed'>Breed - {dog.breed}</li>
        <li className='dog__detail--name'>Name - {dog.name}</li>
        <li className='dog__detail--age'>Age - {dog.age}</li>
        <li className='dog__detail--zipCode'>Zip - {dog.zip_code}</li>
      </ul>
      <FontAwesomeIcon 
        icon={faHeart} 
        className={`heart ${isLiked ? 'red' : 'white'}`} 
        onClick={() => onDogHeartClick(dog)}
      />
    </li>
  )
}
