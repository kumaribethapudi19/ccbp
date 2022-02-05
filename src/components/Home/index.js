import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-page-container">
    <Header />
    <div className="home-description-card">
      <h1 className="home-page-heading">Find Your Next Favorite Books?</h1>
      <p className="home-page-description">
        You are in the right place. Tell us what titles or genres you have
        enjoyed in the past, and we will give you surprisingly insightful
        recommendations.
      </p>
      <button className="home-page-find-button">Find Books</button>
    </div>
    <div className="books-display-card">
      <h1 className="display-heading">Top Rated Books</h1>
      <button className="home-page-find-button">Find Books</button>
      <h1>Carousal Should Come here</h1>
    </div>
    <div className="footer-section">
      <h1>Icons Should come here</h1>
    </div>
  </div>
)
export default Home
