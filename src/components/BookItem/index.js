import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItem = props => {
  console.log(`props came are: ${props}`)
  const {bookItemDetails} = props
  const {id, title, rating, authorName, coverPic, readStatus} = bookItemDetails

  return (
    <li className="book-info-display">
      <img src={coverPic} className="pic-style" />
      <div className="book-info-details-card">
        <h1 className="title-heading">{title}</h1>
        <p className="para">{authorName}</p>
        <p className="para">
          Avg Rating <BsFillStarFill className="star" />
          {rating}
        </p>
        <p className="para">
          Status: <span className="status-style">{readStatus}</span>
        </p>
      </div>
    </li>
  )
}

export default BookItem
