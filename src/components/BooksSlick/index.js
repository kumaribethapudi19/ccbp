import {Link, withRouter} from 'react-router-dom'
import Slider from 'react-slick'
import './index.css'

const BooksSlick = props => {
  const {eachBook} = props
  const {coverPic, title, authorName, id} = eachBook
  return (
    <Link to={`/books/${id}`}>
      <li key={each.id} className="top-rated-book-card-style">
        <img className="top-rated-book-pic-style" src={coverPic} alt={title} />
        <h1 className="top-rated-book-title-style">{title}</h1>
        <p className="top-rated-book-name-style">{authorName} </p>
      </li>
    </Link>
  )
}

export default withRouter(BooksSlick)
