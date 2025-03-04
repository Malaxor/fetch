import React from 'react';
import './style.css'

export function Button ({ disabled, content, type, onClick }) {
  return (
    <button
      className={`${type}`}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
