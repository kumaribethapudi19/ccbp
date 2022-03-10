import {Link} from 'react-router-dom'
import './index.css'

const TopRatedBook = props => {
  const {eachBook} = props
  const {coverPic, title, authorName, id} = eachBook
  return (
    <li className="top-rated-book-card-style">
      <Link to={`/books/${id}`}>
        <img className="top-rated-book-pic-style" src={coverPic} alt={title} />
        <h1 className="top-rated-book-title-style">{title}</h1>
        <p className="top-rated-book-name-style">{authorName}</p>
      </Link>
    </li>
  )
}

export default TopRatedBook
