import {BsSearch} from 'react-icons/bs'

import './index.css'

const BooksHeader = props => {
  const {
    getShelf,
    searchInput,

    changeSearchInput,
    enterSearchInput,
  } = props

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onClickSearchInputButton = () => enterSearchInput()

  const onChangeSearchInput = event => {
    changeSearchInput(event.target.value)
  }

  const getShelfName = () => {
    const shelfName = getShelf()

    if (shelfName === 'ALL') {
      return `All`
    }
    if (shelfName === 'CURRENTLY_READING') {
      return 'Currently Reading'
    }
    if (shelfName === 'WANT_TO_READ') {
      return 'Want to Read'
    }
    return `Read`
  }

  const selectedShelfName = getShelfName()

  return (
    <div className="books-header">
      <h1 className="books-list-heading">{`${selectedShelfName} Books`}</h1>
      <div className="search-container">
        <input
          type="search"
          className="search-input-style"
          value={searchInput}
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          type="button"
          className="search-button"
          testid="searchButton"
          onClick={onClickSearchInputButton}
        >
          <BsSearch className="search-icon-style" />
        </button>
      </div>
    </div>
  )
}

export default BooksHeader
