import React from 'react';
import './style.css'

export function Button ({ disabled, content, type }) {
  return (
    <button
      className='button'
      disabled={disabled}
    >
      {content}
    </button>
  )
}
