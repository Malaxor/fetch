
import { DogList } from '../DogList'
import { FormButton } from '../Buttons'
import { LikedDogsPrevNextBtns } from '../PrevNextBtns'

export function LikedDogs ({ setLikedDogs, likedDogs }) {
  return ( 
    <section id='liked-dogs'>
      <p id="message-for-user">Liked Dogs</p>
      <>
        <p id='liked-dogs-btn-container'>
          <FormButton
            wide='wide'
            disabled={!likedDogs.length} 
            content={`${likedDogs.length} Liked Dogs`}
          />
        </p>
        <LikedDogsPrevNextBtns likedDogs={likedDogs} setLikedDogs={setLikedDogs}/>
      </>
      <DogList
        likedDogs={likedDogs}
        setLikedDogs={setLikedDogs} 
      />
    </section> 
  )
}
