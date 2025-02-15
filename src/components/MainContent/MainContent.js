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
    if (likedDogs.length) {
      if (localStorage.getItem('storedLikedDogs')) {
        localStorage.setItem('storedLikedDogs',JSON.stringify([...likedDogs]))
      } else {
        localStorage.setItem('storedLikedDogs', JSON.stringify([...likedDogs]))
      }
    }
  }, [likedDogs])


  function handleClick (dogId) {
    setLikedDogs(likedDogs => {
      if (likedDogs.find(likedDog => likedDog === dogId)) {
        return likedDogs.filter(likedDog => likedDog !== dogId)
      }
      return [...likedDogs, dogId]
    })
  }

  return ( 
    <main id='main-content'>
      {!isLoggedIn 
        ? <p id="sign-in-message">Sign in and search for loving dog to adopt.</p>
        : <p id='search-instructions'>Omitting all the search parameters will still return results.</p>
      }
      {isLoggedIn && 
        <DogSearch
          isLoggedIn={isLoggedIn}
          setDogs={setDogs}
        />
      }
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
            isLiked={likedDogs.find((likedDog) => likedDog === dog.id)}
          />)
        }
      </section>
    </main> 
  )
}
