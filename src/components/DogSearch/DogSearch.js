import { useState } from 'react';
import axios from 'axios'
import './style.css'
import { baseURL } from '../../constants'
import { Input, Select } from '../Controls'
import { Button } from '../Buttons'
import { capitalizeFirstLetter } from '../../utils';
export function DogSearch ({ 
  isLoggedIn, 
  setDogs, 
  setNextSearchQuery,
  setPrevSearchQuery
}) {
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
    const config = {
      withCredentials: true,
      params: {
        sort
      }
    }

    if (breed) {
      config.params.breeds = []
      config.params.breeds.push(capitalizeFirstLetter(breed.trim().toLowerCase()))
      formData.breed = formData.breed.trim().toLowerCase()
    }
    if (zipCode) {
      config.params.zipCodes = []
      config.params.zipCodes.push(zipCode.trim())
    }
    if (ageMin) {
      config.params.ageMin = ageMin.trim()
      formData.ageMin = formData.ageMin.trim()
    }
    if (ageMax) {
      config.params.ageMax = ageMax.trim()
      formData.ageMax = formData.ageMax.trim()
    }

    setPrevSearchQuery('')
    setFormData(() => ({ ...formData, zipCode: '' }))

    let data
    try {
      const res = await axios.get(`${baseURL}/dogs/search`, config)
      data = res.data
    } catch (err) {
      console.log(err)
    }

    setNextSearchQuery(data.next)

    try {
      const res = await axios.post(`${baseURL}/dogs`, data.resultIds, { withCredentials: true })
      data = res.data
    } catch (err) {
      console.log(err)
    }

    setDogs(data)
  }

  return (
    <>
      <form id='dog-search-form' onSubmit={onFormSubmit}>
        <Select
          styling='large-select'
          name='sort'
          value={sort}
          onChange={onSetFormData} 
        />
        <Input
          styling='large-input'
          placeholder='breed'
          name='breed'
          onChange={onSetFormData}
          value={breed}
        />
        <p id="inputs-container">
          <Input
            styling='medium-input'
            placeholder='zip'
            name='zipCode'
            onChange={onSetFormData}
            value={zipCode}
          />
          <Input
            id='age-max'
            styling='medium-input center-text'
            placeholder='age max'
            name='ageMax'
            onChange={onSetFormData}
            value={ageMax}
          />
          <Input
            styling='medium-input center-text'
            placeholder='age min'
            name='ageMin'
            onChange={onSetFormData}
            value={ageMin}
          />
        </p>
        <Button
          styling='btn form-btn'
          content='Search'
          disabled={!isLoggedIn}
        />
      </form>
    </>
  )
}
