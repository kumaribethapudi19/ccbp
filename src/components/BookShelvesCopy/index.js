import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import BooksHeader from '../BooksHeader'
import ShelfItem from '../ShelfItem'
import BookItem from '../BookItem'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class BookShelvesCopy extends Component {
  state = {
    searchInput: '',
    activeShelf: bookshelvesList[0].id,
    booksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    console.log('component did mount method')
    this.getBooks()
  }

  getShelf = () => {
    const {activeShelf} = this.state
    const selectedShelf = bookshelvesList.filter(
      each => each.id === activeShelf,
    )
    console.log(selectedShelf)
    console.log(selectedShelf[0])
    return selectedShelf[0].value
  }

  getBooks = async () => {
    const {searchInput, activeShelf} = this.state

    const shelf = this.getShelf()
    console.log(`shelf is:${shelf}`)
    console.log(`searchInput Value is:${searchInput}`)

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    console.log('get the books list')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    console.log('After fetching get the response')
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updatedData = fetchedData.books.map(book => ({
        id: book.id,
        title: book.title,
        rating: book.rating,
        authorName: book.author_name,
        coverPic: book.cover_pic,
        readStatus: book.read_status,
      }))
      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="bookhub-loader-container">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderBooksList = () => {
    const {booksList, activeShelf, searchInput} = this.state

    const shouldShowBooksList = booksList.length > 0

    return shouldShowBooksList ? (
      <div className="status-books-container">
        <BooksHeader
          searchInput={searchInput}
          changeSearchInput={this.changeSearchInput}
          activeShelf={activeShelf}
          getShelf={this.getShelf}
        />
        <ul className="books-list">
          {booksList.map(eachBook => (
            <BookItem key={eachBook.id} bookItemDetails={eachBook} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="status-books-container">
        <BooksHeader
          searchInput={searchInput}
          changeSearchInput={this.changeSearchInput}
          activeShelf={activeShelf}
          getShelf={this.getShelf}
        />
        <div className="something-wrong-view-container">
          <img
            className="something-wrong-view"
            src="https://res.cloudinary.com/dp7ibjh2t/image/upload/v1644112090/BookHub/SmthngwntWrong_dbyzgy.png"
          />
          <h1 className="something-wrong-heading">
            {' '}
            Something went wrong, Please try again.{' '}
          </h1>
          <button className="something-wrong-try-again-button">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  renderShelves = () => {
    const {activeShelf} = this.state
    return (
      <>
        <h1 className="status-main-heading">BookShelves</h1>
        <ul className="button-container">
          {bookshelvesList.map(each => (
            <ShelfItem
              key={each.id}
              shelfDetails={each}
              onStatusChange={this.onStatusChange}
              isActive={activeShelf === each.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderBooksListView = () => {
    const {searchInput, booksList, activeShelf} = this.state
    return (
      <div>
        <div className="header-container">
          <Header />
        </div>
        <div className="body-container">
          <div className="mobile-view">
            <div className="search-container">
              <input
                type="search"
                className="search-input-style"
                value={searchInput}
                placeholder="Search"
              />
              <button>
                <BsSearch className="search-icon-style" />
              </button>
            </div>

            <div className="status-container">
              <h1 className="status-main-heading">BookShelves</h1>
              <ul className="button-container">
                {bookshelvesList.map(each => (
                  <ShelfItem
                    key={each.id}
                    shelfDetails={each}
                    onStatusChange={this.onStatusChange}
                    isActive={activeShelf === each.id}
                  />
                ))}
              </ul>
            </div>
            <div className="books-container">
              <ul className="books-display-container">
                {booksList.map(eachBook => (
                  <BookItem key={eachBook.id} bookItemDetails={eachBook} />
                ))}
              </ul>
            </div>
          </div>

          <div className="desktop-view">
            <div className="status-container">{this.renderShelves()}</div>
            <div className="books-and-header-container">
              {this.renderBooksList()}
            </div>
          </div>

          <div className="footer-section">
            <div className="footer-icons-container">
              <FaGoogle className="icon-style" />
              <FaTwitter className="icon-style" />
              <FaInstagram className="icon-style" />
              <FaYoutube className="icon-style" />
            </div>
            <h3 className="footer-note">Contact us</h3>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    const {activeShelf} = this.state
    console.log(`activeShelf id is:${activeShelf}`)

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooksListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default BookShelvesCopy
