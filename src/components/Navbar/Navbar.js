import './style.css'
import fetchLogo from '../../assets/images/fetch-logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetState } from '../../slicers'
import { axiosLogOut } from '../../api'
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

  async function logoutUser () {
    try {
      await axiosLogOut()
    } catch (error) {
      console.error('Logout failed:', error)
    }

    logOut()
    dispatch(resetState())
    navigate('fetch')
  }

  function handleAuthClick () {
    isLoggedIn ? logoutUser() : openModal()
  }

  return (
    <nav id='navbar'>
      <img id='navbar__logo' src={fetchLogo} alt='fetch logo' />
      <p id='navbar__slogan'>Paws for a Cause</p>
      <Button styling='btn sign-in-btn' onClick={handleAuthClick}>
        {isLoggedIn ? 'Sign Out' : 'Sign In'}
      </Button>
      <LoginForm isOpen={isOpen} closeModal={closeModal} logIn={logIn} />
    </nav>
  )
}
