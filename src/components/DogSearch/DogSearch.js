import { useState } from 'react';
import axios from 'axios'
import './style.css'
import { baseURL } from '../../constants'
import { Input, Select } from '../Controls'
import { FormButton } from '../Buttons'
import { capitalizeFirstLetter } from '../../utils';
export function DogSearch ({ 
  isLoggedIn, 
  setDogs, 
  setNextSearchQuery,
  setPrevSearchQuery, 
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
    try {
      const config = {
        withCredentials: true,
        params: {
          sort,
          size: 25
        }
      }
  
      if (breed) {
        config.params.breeds = []
        config.params.breeds.push(capitalizeFirstLetter(breed.toLowerCase()))
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

      // restet shared state
      setNextSearchQuery('')
      setPrevSearchQuery('')

      const { data: searchData } = await axios.get(`${baseURL}/dogs/search`, config)
      setFormData({ breed: '', zipCode: '', ageMin: '', ageMax: '' })
      const next = new URLSearchParams(searchData.next)
      // console.log(searchData.next.includes('size=25'))
      // console.log({'form search': searchData, 'size': next.get('size'), numDogs: searchData.resultIds.length })
      if (searchData.resultIds.length == config.params.size) {
        console.log('at least 25 dogs')
        setNextSearchQuery(searchData.next)
      }
      const { data  } = await axios
        .post(`${baseURL}/dogs`, searchData.resultIds, { withCredentials: true })
      setDogs(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <form id='dog-search-form' onSubmit={onFormSubmit}>
        <Select
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
          id='age-max'
          size='small'
          placeholder='age max'
          name='ageMax'
          onChange={onSetFormData}
          value={ageMax}
        />
        <Input
          size='small'
          placeholder='age min'
          name='ageMin'
          onChange={onSetFormData}
          value={ageMin}
        />
        <FormButton
          content='Search'
          disabled={!isLoggedIn}
        />
      </form>
    </>
  )
}
