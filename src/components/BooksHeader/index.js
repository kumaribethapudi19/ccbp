import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import './index.css'

class BooksHeader extends Component {
  state = {searchInput: ''}

  onChangeOfSearchInputValue = event => {
    const {changeSearchInput, selectedShelfName} = this.props
    this.setState(
      {searchInput: event.target.value},
      changeSearchInput(event.target.value),
    )
  }

  getShelfName = () => {
    const {getShelf} = this.props
    return getShelf()
  }

  render() {
    const {changeSearchInput, getShelf} = this.props
    const {searchInput} = this.state
    const selectedShelfName = this.getShelfName()
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
            onEnter={this.onChangeOfSearchInputValue}
          />
          <button>
            <BsSearch
              className="search-icon-style"
              onEnter={this.onChangeOfSearchInputValue}
            />
          </button>
        </div>
      </div>
    )
  }
}

export default BooksHeader
