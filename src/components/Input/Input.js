import React from 'react';
import './style.css'

export function Input ({ name, value, onChange, placeholder }) {
  return (
    <input
      className={'input'}
      type='text'
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}
