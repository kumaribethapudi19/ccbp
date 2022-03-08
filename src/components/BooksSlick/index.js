import {Link, withRouter} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const BooksSlick = props => {
  const {eachBook} = props
  const {coverPic, title, authorName, id} = eachBook
  console.log(id)

  const settings1 = {
    dots: false,
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

  return (
    <Slider {...settings1}>
      <Link to={`/books/${id}`}>
        <li key={eachBook.id} className="top-rated-book-card-style">
          <img
            className="top-rated-book-pic-style"
            src={coverPic}
            alt={title}
          />
          <h1 className="top-rated-book-title-style">{title}</h1>
          <p className="top-rated-book-name-style">{authorName} </p>
        </li>
      </Link>
    </Slider>
  )
}

export default withRouter(BooksSlick)
