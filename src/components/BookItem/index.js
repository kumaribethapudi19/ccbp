import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItem = props => {
  const {bookItemDetails} = props
  const {title, rating, authorName, coverPic, readStatus, id} = bookItemDetails

  return (
    <Link to={`/books/${id}`}>
      <li className="book-info-display">
        <img src={coverPic} className="pic-style" alt={title} />
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
    </Link>
  )
}

export default BookItem
