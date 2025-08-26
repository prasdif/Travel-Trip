import {Link} from 'react-router-dom'

import Footer from '../Footer'
import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header activeNavbarItem="HOME" />
    <div className="home-container">
      <div className="home-image-container">
        <img
          src="https://res.cloudinary.com/dt7mi4nem/image/upload/v1741060875/image_5_1_hvzpl8.png"
          className="mobile-home-image"
          alt="home"
        />
        <img
          src="https://res.cloudinary.com/dt7mi4nem/image/upload/v1741060456/image_5_zvyxp6.png"
          className="desktop-home-image"
          alt="home"
        />
      </div>
      <div className="home-content-container">
        <h1 className="home-heading">Travel. Relax. Memories.</h1>
        <p className="home-description">
          With travel trip you can experience new travel and the best tourist
          destinations.
        </p>
        <div className="home-book-a-new-trip-button-container">
          <Link to="/book-a-new-trip" className="link">
            <button type="button" className="home-book-a-new-trip-button">
              Book a new trip
            </button>
          </Link>
        </div>
      </div>
    </div>
    <Footer activeNavbarItem="HOME" />
  </>
)

export default Home
