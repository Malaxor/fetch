import { useState } from 'react';
import axios from 'axios'
import './style.css'
import { baseURL } from '../../constants'
import { Input, Select } from '../Controls'
import { Button } from '../Button'
import { capitalize } from '../../utils';
export function DogSearch ({ isLoggedIn, setDogs }) {
  const[formData, setFormData] = useState({
    breed: '',
    ageMax: '',
    ageMin: '',
    zipCode: '',
    sort: 'breed:asc'
  })
  const {
    breed, 
    ageMin, 
    ageMax, 
    zipCode, 
    sort 
  } = formData

  function onSetFormData (e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function onFormSubmit (e) {
    e.preventDefault()
    try {
      const config = {
        withCredentials: true,
        params: {
          sort
        }
      }
  
      if (breed) {
        config.params.breeds = []
        config.params.breeds.push(capitalize(breed.toLowerCase()))
      }
      if (zipCode) {
        config.params.zipCodes = []
        config.params.zipCodes.push(zipCode)
      }
      if (ageMin) {
        config.params.ageMin = ageMin
      }
      if (ageMax) {
        config.params.ageMax = ageMax
      }

      const { data: searchData } = await axios.get(`${baseURL}/dogs/search`, config)
      setFormData({ breed: '', zipCode: '', ageMin: '', ageMax: '' })
      const { data: dogs } = await axios
        .post(`${baseURL}/dogs`, searchData.resultIds, { withCredentials: true })
      setDogs(dogs)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <form id='dog-search' onSubmit={onFormSubmit}>
        <Select
          disabled={!isLoggedIn}
          name='sort'
          value={sort}
          onChange={onSetFormData} 
        />
        <Input
          placeholder='breed'
          name='breed'
          onChange={onSetFormData}
          value={breed}
        />
        <Input
          size='medium'
          placeholder='zip'
          name='zipCode'
          onChange={onSetFormData}
          value={zipCode}
        />
        <Input
          size='small'
          placeholder='max'
          name='ageMax'
          onChange={onSetFormData}
          value={ageMax}

        />
        <Input
          size='small'
          placeholder='min'
          name='ageMin'
          onChange={onSetFormData}
          value={ageMin}
        />
        <Button
          content='Search'
          disabled={!isLoggedIn}
        />
      </form>
    </>
  )
}
