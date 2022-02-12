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
      /*  headers: {
        Authorization: `Bearer ${jwtToken}`,
      },  */
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

  renderCarousal = () => {
    const {topRatedBooksList} = this.state
    console.log(topRatedBooksList)
    return <BooksSlick booksList={topRatedBooksList} />
  }

  onClickFindBooks = () => {
    console.log('Find Books Clicked')
    console.log(this.props)
    const {history} = this.props
    history.push('/shelves')
  }

  renderTopRatedBooksList = () => {
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

            <div className="slick-display-style">{this.renderCarousal()}</div>
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
        <div className="books-display-failure-card">
          <div className="books-display-failure-card-header">
            <h1 className="display-failure-card-heading">
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
export default Home
