import './style.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import axios from 'axios'
import { baseURL } from '../../constants'
import { Input } from '../Controls'
import { Button } from '../Buttons'

export function LoginForm({ isOpen, onClose, onLogin }) {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  const { name, email } = formData
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  function handleChange (e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleLogin () {
    const payload = {
      name: name.trim(),
      email: email.trim()
    }

    try {
      await axios.post(`${baseURL}/auth/login`, payload, { withCredentials: true })
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  async function handleSubmit (e) {
    e.preventDefault()
    await handleLogin()
    setFormData({ name: '', email: '' })
    onClose()
    onLogin()
    navigate('/fetch/dog-search-list')
  }

  return (
    <Modal
      ariaHideApp={false}
      id='modal'
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <form id='navbar__form' onSubmit={handleSubmit}>
        <Input
          styling='w-100'
          placeholder='name'
          value={name}
          name='name'
          onChange={handleChange}
        />
        <Input
          styling='w-100'
          placeholder='email'
          value={email}
          name='email'
          onChange={handleChange}
        />
        <Button
          styling='btn form-btn w-100'
          disabled={!name || !email || !isEmailValid}
        >
          Login
        </Button>
      </form>
    </Modal>
  )
}
