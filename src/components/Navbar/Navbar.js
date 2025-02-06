import { useState } from 'react'
import axios from 'axios'
import './style.css'
import fetchLogo from '../../assets/images/fetch-logo.png'
import { Input } from '../Input'
import { Button } from '../Button'

const baseURL = 'https://frontend-take-home-service.fetch.com'
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Navbar () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const { name, email } = formData

  const config = { withCredentials: true }
  
  async function login () {
    try {
      await axios.post(`${baseURL}/auth/login`, { name, email }, config)
    } catch (err) {
      console.log(err.message)
    }
  }

  async function logout () {
    try {
      await axios.post(`${baseURL}/auth/logout`, {}, config)
    } catch (err) {
      console.log(err.message)
    }
  }
  
  function onSetFormData (e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function onFormSubmit (e) {
    e.preventDefault()
    if (!isLoggedIn) {
      await login()
      setFormData({ name: '', email: '' })
      setIsLoggedIn(true)
    } else {
      await logout()
      setIsLoggedIn(false)
    }
  }
  
 return ( 
  <nav id='navbar'>
    <img id='navbar__logo' src={fetchLogo} alt="fetch logo" />
    <p id='navbar__slogan'>Paws for a Cause</p>
    <form id='navbar__form' onSubmit={onFormSubmit}>
      {!isLoggedIn && <>
      <Input
        placeholder='name'
        value={name}
        name='name'
        onChange={onSetFormData}
      />      
      <Input
        placeholder='email'
        value={email}
        name='email'
        onChange={onSetFormData}
      /></>}
      <Button
        disabled={(!name || !email || !regexEmail.test(email)) && !isLoggedIn}
        content={!isLoggedIn ? 'Sign In' : 'Sign Out'} 
      />
    </form>
  </nav>
 )
}
