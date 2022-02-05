import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const BooksSlick = props => {
  const {booksList} = props
  console.log(booksList)
  const settings = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <ul>
          {booksList.map(each => {
            const {coverPic, title, authorName} = each
            return (
              <>
                <img src={each.coverPic} />
                <h1>{each.title}</h1>
                <h3>{each.authorName} </h3>
              </>
            )
          })}
        </ul>
      </Slider>
    </div>
  )
}

export default BooksSlick
