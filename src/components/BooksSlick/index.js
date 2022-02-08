import {Link, withRouter} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const BooksSlick = props => {
  const {booksList} = props
  console.log(booksList)
  const settings = {
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {booksList.map(each => {
          const {coverPic, title, authorName, id} = each
          console.log(id)
          return (
            <Link to={`/books/${id}`}>
              <div key={each.id} className="top-rated-book-card-style">
                <img className="top-rated-book-pic-style" src={coverPic} />
                <h1 className="top-rated-book-title-style">{title}</h1>
                <p className="top-rated-book-name-style">{authorName} </p>
              </div>
            </Link>
          )
        })}
      </Slider>
    </div>
  )
}

export default withRouter(BooksSlick)
