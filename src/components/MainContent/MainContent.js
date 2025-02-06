import React from 'react';
import './style.css'
import { DogSearch } from '../DogSearch'
export function MainContent () {
  return ( 
    <main id='main-content'>
      <h1 id='main-content__header'>Find Your Furry Best Friend Today</h1>
      <DogSearch />
    </main> 
  )
}
