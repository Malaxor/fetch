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

function Select ({ name, value, onChange, styling, options }) {
  return (
    <select 
      name={name} 
      value={value} 
      className={`select ${styling}`}
      onChange={onChange} 
    >
      {options.map(option => 
        <option key={option.value} value={option.value}>{option.content}</option>
      )}
    </select>
  )
}

export {
  Input,
  Select
}
