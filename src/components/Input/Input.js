import React from 'react';
import './style.css'

function NavbarInput ({ name, value, onChange, placeholder }) {
  return (
    <input
      type='text'
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}
export { NavbarInput }
