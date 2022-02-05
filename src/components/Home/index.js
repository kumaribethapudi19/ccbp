import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {
    topRatedBooksList: [],
    isLoading: false,
  }

  componentDidMount() {
    console.log('component did mount method')
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({
      isLoading: true,
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
      this.setState({topRatedBooksList: updatedData, isLoading: false})
    }
  }

  renderCarousal = () => {
    const {topRatedBooksList} = this.state
    console.log(topRatedBooksList)
  }

  onClickFindBooks = () => {
    console.log('Find Books Clicked')
  }

  renderTopRatedBooksList = () => {
    const {topRatedBooksList} = this.state
    return (
      <div className="home-page-container">
        <Header />
        <div className="home-description-card">
          <h1 className="home-page-heading">Find Your Next Favorite Books?</h1>
          <p className="home-page-description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button
            className="home-page-find-button"
            onClick={this.onClickFindBooks}
          >
            Find Books
          </button>
        </div>
        <div className="books-display-card">
          <div className="books-display-card-header">
            <h1 className="display-heading">
              Top Rated Books
              <span>
                <button className="display-card-find-button">Find Books</button>{' '}
              </span>
            </h1>
          </div>
          <h1>Carousal Should Come here</h1>
          <div>{this.renderCarousal()}</div>
        </div>
        <div className="footer-section">
          <h1>Icons Should come here</h1>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    console.log('render')
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderTopRatedBooksList()
  }
}
export default Home
