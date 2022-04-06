import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Slider from 'react-slick'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header'
import TopRatedBook from '../TopRatedBook'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const settings1 = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1048,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
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
        coverPic: book.cover_pic,
        title: book.title,
        authorName: book.author_name,
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

  renderLoadingView = () => (
    <div className="bookhub-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderTopRatedBooksListView = () => {
    const {topRatedBooksList} = this.state

    const shouldShowBooksList = topRatedBooksList.length !== 0

    return shouldShowBooksList ? (
      <div className="slick-display-style">
        <ul className="slider-container">
          <Slider {...settings1}>
            {topRatedBooksList.map(eachBook => (
              <TopRatedBook eachBook={eachBook} key={eachBook.id} />
            ))}
          </Slider>
        </ul>
      </div>
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

  renderFailureView = () => (
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
  )

  renderViews = () => {
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

  render() {
    return (
      <div className="home-page">
        <Header />
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
            {this.renderViews()}
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
}

export default Home
