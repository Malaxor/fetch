import React from 'react';
import './style.css'

function FormButton ({ disabled, content, wide, onClick }) {
  return (
    <button
      className={`form-button ${wide}`}
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


export { FormButton, PrevNextButton }
