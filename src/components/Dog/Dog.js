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
    <figure className='dog' onClick={() => handleClick(id)}>
      <img className='dog__image' src={image} alt={`image of a ${breed}`} />
      <ul className='dog__details'>
        <li className='dog__detail--breed'>Breed - {breed}</li>
        <li className='dog__detail--name'>Name - {name}</li>
        <li className='dog__detail--age'>Age - {age}</li>
        <li className='dog__detail--zipCode'>Zip - {zipCode}</li>
      </ul>
      {isLiked && <FontAwesomeIcon icon={faHeart} className='heart' />}
    </figure>
  )
}
