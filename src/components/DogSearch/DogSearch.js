import './style.css'
import axios from 'axios'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addDogs, setNextSearchQuery, setPrevSearchQuery } from '../../slicers'
import { capitalizeFirstLetter } from '../../utils';
import { baseURL } from '../../constants'
import { Input, Select } from '../Controls'
import { Button } from '../Buttons'

export function DogSearch () {
  const dispatch = useDispatch()
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

  function clearZipCode () {
    setFormData({ ...formData, zipCode: '' })
  }

  function buildSearchConfig() {
    const params = { sort, withCredentials: true }

    if (formData.breed) {
      const cleaned = formData.breed.trim().toLowerCase()
      params.breeds = [capitalizeFirstLetter(cleaned)]
      formData.breed = cleaned
    }

    if (formData.zipCode) {
      params.zipCodes = [formData.zipCode.trim()]
    }

    if (formData.ageMin) {
      params.ageMin = ageMin
    }

    if (formData.ageMax) {
      params.ageMax = ageMax
    }

    return params
  }

  async function fetchSearchResults (config) {
    try {
      const res = await axios.get(`${baseURL}/dogs/search`, config)
      return res.data // object
    } catch (err) {
      console.error(err)
      return {}
    }
  }

  async function fetchDogs (resultIds) {
    try {
      const res = await axios.post(`${baseURL}/dogs`, resultIds, {
        withCredentials: true
      })
      return res.data // array of dogs
    } catch (err) {
      console.error(err)
      return []
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault()

    const config = buildSearchConfig()

    dispatch(setPrevSearchQuery(''))
    clearZipCode()

    let data = await fetchSearchResults(config)
    dispatch(setNextSearchQuery(data.next))

    data = await fetchDogs(data.resultIds)
    dispatch(addDogs(data))
  }


  const options = [
    { value: 'breed:asc', content: 'Breed - Ascending' },
    { value: 'breed:desc', content: 'Breed - Descending' },
    { value: 'name:asc', content: 'Name - Ascending' },
    { value: 'name:desc', content: 'Name - Descending' },
    { value: 'age:asc', content: 'Age - Ascending' },
    { value: 'age:desc', content: 'Age - Descending' }
  ]

  return (
    <form id='dog-search-form' onSubmit={onFormSubmit}>
      <Select
        styling='large-select'
        name='sort'
        value={sort}
        onChange={onSetFormData}
        options={options} 
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
          styling='medium-input center-text'
          placeholder='age max'
          name='ageMax'
          onChange={onSetFormData}
          value={ageMax}
          type='number'
        />
        <Input
          styling='medium-input center-text'
          placeholder='age min'
          name='ageMin'
          onChange={onSetFormData}
          value={ageMin}
          type='number'
        />
      </p>
      <Button styling='btn form-btn'>Search</Button>
    </form>
  )
}
