import React from 'react';
import './style.css'
import { DogSearch } from '../DogSearch'
export function MainContent ({ isLoggedIn }) {
  return ( 
    <main id='main-content'>
      <DogSearch
        isLoggedIn={isLoggedIn}
      />
      <section id='dog-list'>DOG LIST</section>
    </main> 
  )
}
