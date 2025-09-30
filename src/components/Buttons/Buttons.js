import './style.css'

export function Button ({ disabled, children, styling, onClick }) {
  return (
    <button className={`${styling}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
