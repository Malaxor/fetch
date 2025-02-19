import React from 'react';
import './style.css'

function FormButton ({ disabled, content }) {
  return (
    <button
      className='form-button'
      disabled={disabled}
    >
      {content}
    </button>
  )
}
function PrevNextButton ({ onNextButtonClick, onPrevButtonClick, content, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onNextButtonClick || onPrevButtonClick}
      className='prev-next-button'
    >
      {content}
    </button>
  )
}


export { FormButton, PrevNextButton }
