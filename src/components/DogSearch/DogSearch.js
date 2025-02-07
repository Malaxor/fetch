import { useState } from 'react';
import axios from 'axios'
import './style.css'
import { baseURL } from '../../constants'
import { Input } from '../Input'
import { Button } from '../Button'
export function DogSearch ({ isLoggedIn }) {
  const[formData, setFormData] = useState({
    breed: '',
    ageMax: '',
    ageMin: '',
    zipCode: ''
  })
  const { breed, ageMin, ageMax, zipCode } = formData


  function onSetFormData (e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function onFormSubmit (e) {
    e.preventDefault()
    try {
      const config = {
        withCredentials: true,
        params: {}
      }
      
      if (breed) {
        config.params.breeds = []
        config.params.breeds.push(breed)
      }
      if (zipCode) {
        config.params.zipdCodes = []
        config.params.zipdCodes.push(breed)
      }
      if (ageMin) {
        config.params.ageMin = ageMin
      }
      if (ageMax) {
        config.params.ageMax = ageMax
      }

      const { data: searchData } = await axios.get(`${baseURL}/dogs/search`, config)
      console.log(searchData)
      setFormData({ breed: '', zipCode: '', ageMin: '', ageMax: '' })
      const res = await axios.post(`${baseURL}/dogs`, [...searchData.resultIds], { withCredentials: true })
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return ( 
    <form id='dog-search' onSubmit={onFormSubmit}>
      <Input
        placeholder='breed'
        name='breed'
        onChange={onSetFormData}
        value={breed}
      />
      <Input
        placeholder='zip code'
        name='zipCode'
        onChange={onSetFormData}
        value={zipCode}
      />
      <Input
        placeholder='max age'
        name='ageMax'
        onChange={onSetFormData}
        value={ageMax}
      />
      <Input
        placeholder='min age'
        name='ageMin'
        onChange={onSetFormData}
        value={ageMin}
      />
      <Button
        content='Search'
        disabled={!isLoggedIn}
      />
    </form>
  )
}
