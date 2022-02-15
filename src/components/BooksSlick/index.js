import {Link, withRouter} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const BooksSlick = props => {
  const {booksList} = props
  console.log(booksList)
  const settings1 = {
    dots: false,
    slidesToShow: 3,
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
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1226,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <ul className="slider-container" testid="sliderContainer">
      <Slider {...settings1}>
        {booksList.map(each => {
          const {coverPic, title, authorName, id} = each
          console.log(id)
          return (
            <Link to={`/books/${id}`}>
              <div key={each.id} className="top-rated-book-card-style">
                <img
                  className="top-rated-book-pic-style"
                  src={coverPic}
                  alt={title}
                />
                <h1 className="top-rated-book-title-style">{title}</h1>
                <p className="top-rated-book-name-style">{authorName} </p>
              </div>
            </Link>
          )
        })}
      </Slider>
    </ul>
  )
}

export default withRouter(BooksSlick)
