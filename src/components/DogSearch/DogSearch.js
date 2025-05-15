import axios from 'axios'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addDogs, setNextSearchQuery, setPrevSearchQuery } from '../../slicers'
import { capitalizeFirstLetter } from '../../utils';
import { baseURL } from '../../constants'
import './style.css'
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
      formData.breed = formData.breed.trim()
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

    dispatch(setPrevSearchQuery(''))
    setFormData(() => ({ ...formData, zipCode: '' }))

    let data
    try {
      const res = await axios.get(`${baseURL}/dogs/search`, config)
      data = res.data
    } catch (err) {
      console.log(err)
    }

    dispatch(setNextSearchQuery(data.next))
    
    try {
      const res = await axios.post(`${baseURL}/dogs`, data.resultIds, { withCredentials: true })
      data = res.data
    } catch (err) {
      console.log(err)
    }
    
    sessionStorage.setItem('dogs', JSON.stringify(data))
    dispatch(addDogs(data))
  }
  const options = [
    { 
      value: 'breed:asc',
      content: 'Breed - Ascending'
    },
    {
      value: 'breed:desc',
      content: 'Breed - Descending'
    },
    {
      value: 'name:asc',
      content: 'Name - Ascending'
    },
    {
      value: 'name:desc',
      content: 'Name - Descending'
    },
    {
      value: 'age:asc',
      content: 'Age - Ascending'
    },
    {
      value: 'age:desc',
      content: 'Age - Descending'
    }
  ]

  return (
    <>
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
        />
      </form>
    </>
  )
}
