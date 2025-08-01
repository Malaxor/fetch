import './style.css'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { emptyDogs, emptyLikedDogs } from '../../slicers'
import fetchLogo from '../../assets/images/fetch-logo.png'
import { baseURL } from '../../constants'
import { LoginForm } from '../LoginForm'
import { Button } from '../Buttons'

export function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const logIn = () => setIsLoggedIn(true)
  const logOut = () => setIsLoggedIn(false)

  const logoutUser = async () => {
    try {
      await axios.post(`${baseURL}/auth/logout`, {}, { withCredentials: true })
    } catch (error) {
      console.error('Logout failed:', error)
    }

    logOut()
    dispatch(emptyDogs())
    dispatch(emptyLikedDogs())
    navigate('fetch')
  }

  const handleAuthClick = () => {
    isLoggedIn ? logoutUser() : openModal()
  }

  return (
    <nav id='navbar'>
      <img id='navbar__logo' src={fetchLogo} alt='fetch logo' />
      <p id='navbar__slogan'>Paws for a Cause</p>
      <Button
        styling='btn sign-in-btn'
        onClick={handleAuthClick}
      >
        {isLoggedIn ? 'Sign Out' : 'Sign In'}
      </Button>
      <LoginForm
        isOpen={isOpen}
        onClose={closeModal}
        onLogin={logIn}
      />
    </nav>
  )
}
