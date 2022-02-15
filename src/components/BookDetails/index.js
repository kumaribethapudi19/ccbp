import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import BooksSlick from '../BooksSlick'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class BookDetails extends Component {
  state = {
    bookData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    console.log('component did mount method')
    this.getBookDetails()
  }

  getBookDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const bookId = id

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    console.log('get book Details')
    const jwtToken = Cookies.get('jwt_token')
    console.log(`bookId is : ${bookId}`)
    const url = `https://apis.ccbp.in/book-hub/books/${bookId}`
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
      const updatedData = {
        aboutAuthor: fetchedData.book_details.about_author,
        aboutBook: fetchedData.book_details.about_book,
        authorName: fetchedData.book_details.author_name,
        coverPic: fetchedData.book_details.cover_pic,
        id: fetchedData.book_details.id,
        rating: fetchedData.book_details.rating,
        readStatus: fetchedData.book_details.read_status,
        title: fetchedData.book_details.title,
      }
      console.log(updatedData)

      this.setState({
        bookData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderBookDetails = () => {
    const {bookData} = this.state
    const {
      id,
      rating,
      coverPic,
      aboutAuthor,
      aboutBook,
      authorName,
      readStatus,
      title,
    } = bookData
    return (
      <div>
        <div className="header-container">
          <Header />
        </div>
        <div className="body-container">
          <div className="book-details-container">
            <div className="cover-details">
              <img src={coverPic} alt="book" className="cover-pic-style" />
              <div className="cover-details-card">
                <h1 className="main-heading">{title}</h1>
                <p className="cover-description">{authorName}</p>
                <p className="cover-description">
                  Avg Rating <BsFillStarFill className="star" />
                  {rating}
                </p>
                <p className="cover-description">
                  Status: <span className="status-style">{readStatus}</span>
                </p>
              </div>
            </div>
            <br className="line-style" />
            <h1 className="heading">About Author</h1>
            <p className="description">{aboutAuthor}</p>
            <h1 className="heading">About Book</h1>
            <p className="description">{aboutBook}</p>
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
        return this.renderBookDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default BookDetails
