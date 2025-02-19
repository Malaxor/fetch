import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './style.css'

export function Dog ({ 
  id, 
  image, 
  name, 
  age, 
  zipCode, 
  breed, 
  handleClick,
  isLiked 
}) {
  return ( 
    <li className='dog'>
      <img className='dog__image' src={image} alt={`a ${age}-year-old ${breed} named ${name}`} />
      <ul className='dog__details'>
        <li className='dog__detail--breed'>Breed - {breed}</li>
        <li className='dog__detail--name'>Name - {name}</li>
        <li className='dog__detail--age'>Age - {age}</li>
        <li className='dog__detail--zipCode'>Zip - {zipCode}</li>
      </ul>
      <FontAwesomeIcon 
        icon={faHeart} 
        className={`heart ${isLiked ? 'red' : 'white'}`} 
        onClick={() => handleClick(id)}
      />
    </li>
  )
}
