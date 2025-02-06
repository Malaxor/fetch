import React from 'react';
import './style.css'

export function Input ({ name, value, onChange, placeholder, borderBottom }) {
  return (
    <input
      className={`input ${borderBottom ? 'border-bottom' : ''}`}
      type='text'
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}
