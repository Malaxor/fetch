import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css'
import { LoginForm } from '../LoginForm'
import fetchLogo from '../../assets/images/fetch-logo.png'
import { baseURL } from '../../constants'
import { Button } from '../Buttons'

export function Navbar ({ isLoggedIn, loginHandler, logoutHandler }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()

  function openModalHandler () {
    setIsModalOpen(true)
  }
  function closeModalHandler () {
    setIsModalOpen(false)
  }
  
  async function logoutUser () {
    try {
      await axios.post(`${baseURL}/auth/logout`, {}, { withCredentials: true })
    } catch (err) {
      console.log(err)
    }
    logoutHandler()
    navigate('/fetch')
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
        loginHandler={loginHandler}
      />
    </nav>
  )
}
