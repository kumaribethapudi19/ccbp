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
          return (
            <div key={each.id} className="top-rated-book-card-style">
              <img className="top-rated-book-pic-style" src={each.coverPic} />
              <h1 className="top-rated-book-title-style">{each.title}</h1>
              <p className="top-rated-book-name-style">{each.authorName} </p>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default BooksSlick
