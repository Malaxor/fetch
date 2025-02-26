import React from 'react';
import './style.css'

function Button ({ 
  disabled, 
  content, 
  styling, // no-background
  onClick 
}) {
  return (
    <button
      className={`button ${styling}`}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
function PrevNextButton ({ onClick, content, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className='prev-next-button'
    >
      {content}
    </button>
  )
}


export { Button, PrevNextButton }
