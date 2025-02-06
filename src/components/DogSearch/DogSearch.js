import React from 'react';
import './style.css'
import { Input } from '../Input'
export function DogSearch () {
  return ( 
    <form id='dog-search'>
      <Input
        placeholder='breed'
      />
      <Input
        placeholder='zip code'
      />
      <Input
        placeholder='max age'
      />
      <Input
        placeholder='min age'
      />
    </form>
  )
}
