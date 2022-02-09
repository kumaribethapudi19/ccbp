import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header'
import BooksSlick from '../BooksSlick'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class BookShelves extends Component {
  state = {
    searchInput: '',
    booksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    console.log('component did mount method')
    this.getBooks()
  }

  getBooks = async () => {
    const searchInput = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    console.log('get toprated books list')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=All&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    console.log('After fetching get the response')
    const response = await fetch(url, options)
    console.log(response)
    /*  if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.books.map(book => ({
        id: book.id,
        authorName: book.author_name,
        coverPic: book.cover_pic,
        title: book.title,
      }))
      this.setState({
        topRatedBooksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }  */
  }

  renderBooksList = () => {
    const {booksList} = this.state
    return (
      <div className="home-page-container">
        <div className="header-container">
          <Header />
        </div>
        <div className="body-container">
          <div className="bookshelf-header-desktop-view">
            <h1 className="bookshelf-main-heading">All Books</h1>
            <div className="search-container">
              <input
                type="search"
                className="search-input-style"
                value={searchInput}
              />
            </div>
          </div>
          <div className="bookshelf-header-mobile-view">
            <div className="search-container">
              <input
                type="search"
                className="search-input-style"
                value={searchInput}
              />
            </div>
          </div>
          <div className="status-container">
            <h1 className="status-main-heading">BookShelves</h1>
            <div className="button-container">
              <button className="status-button" type="button">
                All
              </button>
              <button className="status-button" type="button">
                Read
              </button>
              <button className="status-button" type="button">
                Currently Reading
              </button>
              <button className="status-button" type="button">
                Want To Read
              </button>
            </div>
          </div>
          <div className="result-books-container">
            <h1>Result shelf books shown here</h1>
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

  renderFailureView = () => (
    <div className="home-page-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">
        <div className="bookshelf-header-desktop-view">
          <h1 className="bookshelf-main-heading">All Books</h1>
          <div className="search-container">
            <input
              type="search"
              className="search-input-style"
              value={searchInput}
            />
          </div>
        </div>
        <div className="bookshelf-header-mobile-view">
          <div className="search-container">
            <input
              type="search"
              className="search-input-style"
              value={searchInput}
            />
          </div>
        </div>
        <div className="status-container">
          <h1 className="status-main-heading">BookShelves</h1>
          <div className="button-container">
            <button className="status-button" type="button">
              All
            </button>
            <button className="status-button" type="button">
              Read
            </button>
            <button className="status-button" type="button">
              Currently Reading
            </button>
            <button className="status-button" type="button">
              Want To Read
            </button>
          </div>
        </div>
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
    </div>
  )

  renderLoadingView = () => (
    <div className="bookhub-loader-container">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTopRatedBooksList()
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
