import React from 'react';
import './style.css'

export function Button ({ disabled, content, styling, onClick }) {
  return (
    <button
      className={`${styling}`}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
