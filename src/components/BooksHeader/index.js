import {BsSearch} from 'react-icons/bs'

import './index.css'

const BooksHeader = props => {
  const {
    // changeInSearch,
    getShelf,
    searchInput,
    // onChangeOfSearchInput,
    changeSearchInput,
    enterSearchInput,
  } = props

  console.log(`HEADER FUNCTION CALLED`)
  console.log(searchInput)
  console.log(getShelf())

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onClickSearchInputButton = () => enterSearchInput()

  const onChangeSearchInput = event => {
    changeSearchInput(event.target.value)
  }

  const getShelfName = () => getShelf()

  console.log(`searchInput:${searchInput}`)

  const selectedShelfName = getShelfName()
  console.log(`selected SHELF NAME:${selectedShelfName}`)

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
        <button type="button" className="search-button" testid="searchButton">
          <BsSearch
            className="search-icon-style"
            onClick={onClickSearchInputButton}
          />
        </button>
      </div>
    </div>
  )
}

export default BooksHeader
