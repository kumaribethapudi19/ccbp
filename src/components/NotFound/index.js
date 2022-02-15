import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="page-not-found">
    <img
      src="https://res.cloudinary.com/dp7ibjh2t/image/upload/v1643948713/BookHub/pagentfnd-mb-img_mnh5sz.png"
      className="not-found-image-style"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="not-found-button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
