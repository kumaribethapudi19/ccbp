import './index.css'

const ShelfItem = props => {
  const {shelfDetails, onStatusChange, isActive} = props
  const {id, value, label} = shelfDetails
  const onClickStatusItem = () => {
    onStatusChange(id)
  }

  const activeStatusBtnClassName = isActive ? 'active-status-btn' : ''

  return (
    <li className="shelf-item-container ">
      <button
        type="button"
        className={`status-button ${activeStatusBtnClassName}`}
        onClick={onClickStatusItem}
        value={value}
        id={id}
      >
        {label}
      </button>
    </li>
  )
}

export default ShelfItem
