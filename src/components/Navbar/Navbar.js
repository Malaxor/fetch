import './style.css'
import fetchLogo from '../../assets/images/fetch-logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetState } from '../../slicers'
import { logout } from '../../api'
import { LoginForm } from '../LoginForm'
import { Button } from '../Buttons'

export function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => setIsOpen(false)
  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  async function logoutUser () {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }

    handleLogout()
    dispatch(resetState())
    navigate('fetch')
  }

  function handleClick () {
    if (isLoggedIn) {
      logoutUser()
    } else {
      handleOpenModal()
    }
  }

  return (
    <nav id='navbar'>
      <img id='navbar__logo' src={fetchLogo} alt='fetch logo' />
      <p id='navbar__slogan'>PupMatch Rescue</p>
      <Button styling='btn sign-in-btn' onClick={handleClick}>
        {isLoggedIn ? 'Sign Out' : 'Sign In'}
      </Button>
      <LoginForm isOpen={isOpen} handleCloseModal={handleCloseModal} handleLogin={handleLogin} />
    </nav>
  )
}
