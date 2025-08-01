import './style.css'

export function Button ({ disabled = false, children, styling, onClick }) {
  return (
    <button className={`${styling}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
