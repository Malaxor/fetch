import React from 'react';
import './style.css'

export function Dog ({ id, image, name, age, zipCode, breed, handleClick }) {
  return ( 
    <figure className='dog' key={id} onClick={() => handleClick(id)}>
      <img className='dog__image' src={image} />
      <ul className='dog__details'>
        <li className='dog__detail--breed'>Breed - {breed}</li>
        <li className='dog__detail--name'>Name - {name}</li>
        <li className='dog__detail--age'>Age - {age}</li>
        <li className='dog__detail--zipCode'>Zip - {zipCode}</li>
      </ul>
    </figure>
  )
}
