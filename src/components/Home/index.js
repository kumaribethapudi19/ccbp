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
class Home extends Component {
  state = {
    topRatedBooksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    console.log('component did mount method')
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    console.log('get toprated books list')
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
    }
  }

  renderLoadingView = () => (
    <div className="bookhub-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCarousal = () => {
    const {topRatedBooksList} = this.state
    console.log(topRatedBooksList)
    return (
      <BooksSlick topRatedBooksList={topRatedBooksList} testid="booksSlick" />
    )
  }

  onClickFindBooks = () => {
    console.log('Find Books Clicked')
    console.log(this.props)
    const {history} = this.props
    history.push('/shelf')
  }

  onTryAgainButtonClicked = () => {
    console.log('Try Again Button clicked')
    this.getTopRatedBooks()
  }

  renderTopRatedBooksList = () => {
    const {topRatedBooksList} = this.state

    const shouldShowBooksList = topRatedBooksList.length > 0

    return shouldShowBooksList ? (
      <div className="slick-display-style">{this.renderCarousal()}</div>
    ) : (
      <div className="something-wrong-view-container">
        <img
          alt="no books"
          className="something-wrong-view"
          src="https://res.cloudinary.com/dp7ibjh2t/image/upload/v1644112090/BookHub/SmthngwntWrong_dbyzgy.png"
        />
        <h1 className="something-wrong-heading">
          Something went wrong, Please try again.
        </h1>
        <button
          type="button"
          className="something-wrong-try-again-button"
          onClick={this.onTryAgainButtonClicked}
        >
          Try Again
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="bookhub-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderTopRatedBooksListView = () => {
    const {topRatedBooksList} = this.state
    return (
      <div>
        <div className="header-container">
          <Header />
        </div>
        <div className="body-container">
          <div className="home-description-card">
            <h1 className="home-page-heading">
              Find Your Next Favorite Books?
            </h1>
            <p className="home-page-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <button
              className="home-page-find-button"
              type="button"
              onClick={this.onClickFindBooks}
            >
              Find Books
            </button>
          </div>
          <div className="books-display-card">
            <div className="books-display-card-header">
              <h1 className="display-card-heading">
                Top Rated Books
                <span>
                  <button
                    type="button"
                    className="display-card-find-button"
                    onClick={this.onClickFindBooks}
                  >
                    Find Books
                  </button>
                </span>
              </h1>
            </div>
            {this.renderTopRatedBooksList()}
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

  renderFailureView = () => (
    <div>
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">
        <div className="home-description-card">
          <h1 className="home-page-heading">Find Your Next Favorite Books?</h1>
          <p className="home-page-description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button
            className="home-page-find-button"
            type="button"
            onClick={this.onClickFindBooks}
          >
            Find Books
          </button>
        </div>
        <div className="books-display-card">
          <div className="books-display-card-header">
            <h1 className="display-card-heading">
              Top Rated Books
              <span>
                <button
                  type="button"
                  className="display-card-find-button"
                  onClick={this.onClickFindBooks}
                >
                  Find Books
                </button>
              </span>
            </h1>
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

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTopRatedBooksListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default Home
