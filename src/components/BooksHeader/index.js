import {BsSearch} from 'react-icons/bs'

import './index.css'

const BooksHeader = props => {
  const {changeInSearch, getShelf, searchInput, onChangeOfSearchInput} = props
  console.log(searchInput)

  const onChangeOfSearchInputValue = event => {
    console.log('search Input value changed')
    console.log(event)

    // onChangeOfSearchInput(event)
  }

  const onEnterSearchInputValue = event => {
    if (event.key === 'Enter') {
      changeInSearch(event.target.value)
    }
  }

  const getShelfName = () => {
    getShelf()
  }

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
          onChange={onChangeOfSearchInputValue()}
        />
        <button>
          <BsSearch
            className="search-icon-style"
            onEnter={onEnterSearchInputValue()}
          />
        </button>
      </div>
    </div>
  )
}

export default BooksHeader
