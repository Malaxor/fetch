import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../LoginForm'
import './style.css'
import fetchLogo from '../../assets/images/fetch-logo.png'
import { baseURL } from '../../constants'
import { Button } from '../Buttons'

export function Navbar ({ isLoggedIn, logout, login }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()

  function openModal () {
    setIsModalOpen(true)
  }
  function closeModal () {
    setIsModalOpen(false)
  }
  
  async function logoutUser () {
    try {
      await axios.post(`${baseURL}/auth/logout`, {}, { withCredentials: true })
      logout()
      navigate('/fetch')
    } catch (err) {
      console.log(err)
    }
  }

  return ( 
    <nav id='navbar'>
      <img id='navbar__logo' src={fetchLogo} alt="fetch logo" />
      <p id='navbar__slogan'>Paws for a Cause</p>
      <Button
        type='btn sign-in-btn'
        content={!isLoggedIn ? 'Sign In' : 'Sign Out'}
        onClick={!isLoggedIn ? openModal : logoutUser} 
      />
      <LoginForm 
        isModalOpen={isModalOpen} 
        closeModal={closeModal}
        login={login}
      />
    </nav>
  )
}
