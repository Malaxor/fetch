import './style.css'
import axios from 'axios'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { 
  addDogs,
  emptyDogs, 
  setNextSearchQuery, 
  setPrevSearchQuery,
  setLoading,
  setHasDogs 
} from '../../slicers'
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
    const config = { 
      withCredentials: true, 
      params: {
        sort
      }
    }

    if (formData.breed) {
      const cleaned = formData.breed.trim().toLowerCase()
      config.params.breeds = [capitalizeFirstLetter(cleaned)]
      formData.breed = cleaned
    }

    if (formData.zipCode) {
      config.params.zipCodes = [formData.zipCode.trim()]
    }

    if (formData.ageMin) {
      config.params.ageMin = ageMin
    }

    if (formData.ageMax) {
      config.params.ageMax = ageMax
    }

    return config
  }

  async function fetchSearchData (config) {
    try {
      const { data } = await axios.get(`${baseURL}/dogs/search`, config)
      return data // object
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchDogs (resultIds) {
    try {
      const { data } = await axios.post(`${baseURL}/dogs`, resultIds, {
        withCredentials: true
      })
      return data // array
    } catch (err) {
      console.error(err)
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault()
    dispatch(setLoading(true))
    dispatch(setHasDogs(null))
    dispatch(emptyDogs())
    dispatch(setPrevSearchQuery(''))

    const config = buildSearchConfig()
    clearZipCode()

    const searchData = await fetchSearchData(config)
    dispatch(setNextSearchQuery(searchData.next))

    const dogsArr = await fetchDogs(searchData.resultIds)
    dispatch(dogsArr.length > 0 ? addDogs(dogsArr) : setHasDogs(false))
    dispatch(setLoading(false))
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
      <div id="inputs-container">
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
      </div>
      <Button styling='btn form-btn'>Search</Button>
    </form>
  )
}
