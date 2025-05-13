import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { emptyDogsAndLikedDogs } from '../../slicers'
import fetchLogo from '../../assets/images/fetch-logo.png'
import { baseURL } from '../../constants'
import { LoginForm } from '../LoginForm'
import { Button } from '../Buttons'
import './style.css'

export function Navbar () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedInStatus = JSON.parse(sessionStorage.getItem('isLoggedIn'))
    setIsLoggedIn(loggedInStatus)
  }, [isLoggedIn])

  function openModalHandler () {
    setIsModalOpen(true)
  }
  function closeModalHandler () {
    setIsModalOpen(false)
  }
  function logOutHandler () {
    setIsLoggedIn(false)
    sessionStorage.setItem('isLoggedIn', false)
  }
  function logInHandler () {
    setIsLoggedIn(true)
    sessionStorage.setItem('isLoggedIn', true)
  }
  
  async function logoutUser () {
    try {
      await axios.post(`${baseURL}/auth/logout`, {}, { withCredentials: true })
    } catch (err) {
      console.log(err)
    }
    logOutHandler()
    dispatch(emptyDogsAndLikedDogs())
    navigate('fetch')
  }

  return ( 
    <nav id='navbar'>
      <img id='navbar__logo' src={fetchLogo} alt="fetch logo" />
      <p id='navbar__slogan'>Paws for a Cause</p>
      <Button
        styling='btn sign-in-btn'
        content={!isLoggedIn ? 'Sign In' : 'Sign Out'}
        onClick={!isLoggedIn ? openModalHandler : logoutUser} 
      />
      <LoginForm 
        isModalOpen={isModalOpen} 
        closeModalHandler={closeModalHandler}
        logInHandler={logInHandler}
      />
    </nav>
  )
}
