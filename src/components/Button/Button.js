import React from 'react';
import './style.css'

function Button ({ disabled, content, type }) {
  return (
    <button
      className='button'
      disabled={disabled}
      type={type}>
      {content}
    </button>
  )
}
export { Button }