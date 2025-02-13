import { useState, useEffect } from 'react';
import './style.css'
import { DogSearch } from '../DogSearch'
import { Dog } from '../Dog'
export function MainContent ({ isLoggedIn }) {
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    if (!isLoggedIn) {
      setDogs([])
    }
  },[isLoggedIn])
   
  return ( 
    <main id='main-content'>
      <DogSearch
        isLoggedIn={isLoggedIn}
        setDogs={setDogs}
      />
      <section id='dog-list'>
        {dogs.map(dog =>
          <Dog
            key={dog.id}
            image={dog.img}
            name={dog.name}
            age={dog.age}
            breed={dog.breed}
            zipCode={dog.zip_code}
          />)
        }
      </section>
    </main> 
  )
}
