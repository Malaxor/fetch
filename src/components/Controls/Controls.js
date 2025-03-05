import React from 'react'
import './style.css'

function Input ({ name, value, onChange, placeholder, styling }) {
  return (
    <input
      className={`input ${styling}`}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}

function Select ({ name, value, onChange, disabled, styling }) {
  return (
    <select 
      name={name} 
      value={value} 
      className={`select ${styling}`}
      onChange={onChange} 
      disabled={disabled}
    >
      <option value="breed:asc">Breed - Ascending</option>
      <option value="breed:desc">Breed - Descending</option>
      <option value="name:asc">Name - Ascending</option>
      <option value="name:desc">Name - Descending</option>
      <option value="age:asc">Age - Ascending</option>
      <option value="age:desc">Age - Descending</option>
    </select>
  )
}

export {
  Input,
  Select
}
