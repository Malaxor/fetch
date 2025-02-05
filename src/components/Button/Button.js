import React from 'react';
import './style.css'

function Button ({ disabled, content, type }) {
  return (
    <button disabled={disabled} type={type}>
      {content}
    </button>
  )
}
export { Button }