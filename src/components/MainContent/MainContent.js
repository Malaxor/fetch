import { useState, useEffect } from 'react';
import './style.css'
import { DogSearch } from '../DogSearch'
import { Dog } from '../Dog'
export function MainContent ({ isLoggedIn }) {
  const [dogs, setDogs] = useState([])
  const [likedDogs, setLikedDogs] = useState([])

  useEffect(() => {
    if (!isLoggedIn) {
      setDogs([])
      setLikedDogs([])
    }
  },[isLoggedIn])

  useEffect(() => {
    if (likedDogs?.length) {
      console.log('liked dogs exist')
      if (localStorage.getItem('storedLikedDogs')) {
        console.log('storedLikedDogs exists')
        localStorage.setItem('storedLikedDogs',JSON.stringify(likedDogs)) 
      } else {
        localStorage.setItem('storedLikedDogs', JSON.stringify(likedDogs))
      }
    }
  }, [likedDogs])


  function handleClick (dogId) {
    setLikedDogs(likedDogs => [...likedDogs, dogId])
  }
  console.log(localStorage)
   
  return ( 
    <main id='main-content'>
      {!isLoggedIn 
        ? <p id="sign-in-message">Sign in and search for loving dog to adopt.</p>
        : <p id='search-instructions'>Omitting all the search parameters will still return results.</p>
      }
      <DogSearch
        isLoggedIn={isLoggedIn}
        setDogs={setDogs}
      />
      <section id='dog-list'>
        {dogs.map(dog =>
          <Dog
            key={dog.id}
            id={dog.id}
            handleClick={handleClick}
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
