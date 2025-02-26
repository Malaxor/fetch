import { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import './style.css'
import { baseURL } from '../../constants'
import { Input } from '../Controls'
import { Button } from '../Buttons'

export function LoginForm ({ login, isModalOpen, closeModal }) {
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
    try {
      await axios.post(`${baseURL}/auth/login`, { name, email }, { withCredentials: true })
    } catch (err) {
      console.log(err)
    }
  }

  async function onFormSubmit (e) {
    e.preventDefault()
    await loginUser()
    setFormData({ name: '', email: '' })
    login()
    closeModal()
  }
  
 return ( 
  <Modal
    id='modal'
    isOpen={isModalOpen}
    onRequestClose={closeModal}
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
        disabled={!name || !email || !regexEmail.test(email)}
        content='Login'
      />
    </form>
  </Modal>
 )
}