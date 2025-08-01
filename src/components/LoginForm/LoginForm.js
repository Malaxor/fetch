import './style.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import axios from 'axios'
import { baseURL } from '../../constants'
import { Input } from '../Controls'
import { Button } from '../Buttons'

export function LoginForm ({ isModalOpen, closeModalHandler, logInHandler }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const { name, email } = formData

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  function onSetFormData (e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  async function loginUser () {
    const payload = {
      name: name.trim(),
      email: email.trim()
    }
    try {
      await axios.post(`${baseURL}/auth/login`, payload, { withCredentials: true })
    } catch (err) {
      console.log(err)
    }
  }

  async function onFormSubmit (e) {
    e.preventDefault()
    await loginUser()
    setFormData({ name: '', email: '' })
    closeModalHandler()
    logInHandler()
    navigate('/fetch/dog-search-list')
  }
  
 return ( 
  <Modal
    ariaHideApp={false}
    id='modal'
    isOpen={isModalOpen}
    onRequestClose={closeModalHandler}
  >
    <form id='navbar__form' onSubmit={onFormSubmit}>
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
      />
      <Button
        styling='btn form-btn'
        disabled={!name || !email || !regexEmail.test(email)}
      >
        Login
      </Button>
    </form>
  </Modal>
 )
}