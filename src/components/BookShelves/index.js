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
class BookShelves extends Component {
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
    console.log(`selectedShelf NAME:${selectedShelf}`)
    console.log(selectedShelf[0])
    return selectedShelf[0].value
  }

  getBooks = async () => {
    const {searchInput} = this.state

    const shelf = this.getShelf()
    console.log(`shelf is:${shelf}`)
    console.log(`searchInput Value is:${searchInput}`)

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    console.log('get the books list')
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${searchInput}`

    console.log(`url:${url}`)

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

      const searchedData = updatedData.filter(each =>
        each.title.toLowerCase().includes(searchInput.toLowerCase()),
      )

      this.setState({
        booksList: searchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onTryAgainButtonClicked = () => {
    console.log('Try Again Button clicked')
    this.getBooks()
  }

  renderLoadingView = () => (
    <div className="bookhub-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onStatusChange = shelfValue => {
    console.log('button clicked')

    this.setState({activeShelf: shelfValue}, this.getBooks)
  }

  enterSearchInput = () => {
    this.getBooks()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  renderBooksList = () => {
    const {booksList, searchInput} = this.state

    const shouldShowBooksList = booksList.length !== 0

    return shouldShowBooksList ? (
      <div className="status-books-container">
        <div className="books-header">
          <BooksHeader
            searchInput={searchInput}
            getShelf={this.getShelf}
            changeSearchInput={this.changeSearchInput}
            enterSearchInput={this.enterSearchInput}
          />
        </div>

        <ul className="books-list">
          {booksList.map(eachBook => (
            <BookItem key={eachBook.id} bookItemDetails={eachBook} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="status-books-container">
        <div className="books-header">
          <BooksHeader
            searchInput={searchInput}
            getShelf={this.getShelf}
            changeSearchInput={this.changeSearchInput}
            enterSearchInput={this.enterSearchInput}
          />
        </div>
        <div className="search-fail-container">
          <img
            alt="no books"
            className="search-fail-view"
            src="https://res.cloudinary.com/dp7ibjh2t/image/upload/v1645208490/searchfail_rq1oe5.png"
          />
          <p className="search-fail-msg">
            {` Your search for ${searchInput} did not find any matches.`}
          </p>
        </div>
      </div>
    )
  }

  renderShelves = () => {
    const {activeShelf} = this.state
    return (
      <>
        <h1 className="status-main-heading">Bookshelves</h1>
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
          <div className="books-view">
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
            <p className="footer-note">Contact us</p>
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => {
    const {searchInput, booksList, activeShelf} = this.state
    return (
      <div>
        <div className="header-container">
          <Header />
        </div>
        <div className="body-container">
          <div className="books-view">
            <div className="status-container">{this.renderShelves()}</div>
            <div className="books-and-header-container">
              <div className="status-books-container">
                <div className="books-header">
                  <BooksHeader
                    searchInput={searchInput}
                    getShelf={this.getShelf}
                    changeSearchInput={this.changeSearchInput}
                    enterSearchInput={this.enterSearchInput}
                  />
                </div>
                <div
                  className="something-wrong-view-container"
                  testid="somethingWrongViewContainer"
                >
                  <img
                    alt="failure view"
                    className="something-wrong-view"
                    src="https://res.cloudinary.com/dp7ibjh2t/image/upload/v1644112090/BookHub/SmthngwntWrong_dbyzgy.png"
                  />
                  <p className="something-wrong-heading">
                    Something went wrong. Please try again
                  </p>
                  <button
                    type="button"
                    className="something-wrong-try-again-button"
                    onClick={this.onTryAgainButtonClicked}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-section" testid="footerSection">
            <div className="footer-icons-container">
              <FaGoogle className="icon-style" />
              <FaTwitter className="icon-style" />
              <FaInstagram className="icon-style" />
              <FaYoutube className="icon-style" />
            </div>
            <p className="footer-note">Contact us</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    console.log(this.props)

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
export default BookShelves
