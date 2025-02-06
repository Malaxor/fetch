import React from 'react';
import './style.css'
export function DogList () {
  return ( 
    <section id='dog-list'>
      <h2 id='dog-list__header'>Find Your Furry Best Friend Today.</h2>
      <form id='dog-list__form'>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </form>
    </section> 
  )
}
