import {Link} from 'react-router-dom'

import Footer from '../Footer'
import Header from '../Header'
import TripItem from '../TripItem'

import TripsListContext from '../../context/TripsListContext'

import './index.css'

const MyTrips = () => (
  <TripsListContext.Consumer>
    {value => {
      const {tripsList} = value

      return (
        <>
          <Header activeNavbarItem="MY_TRIPS" />
          {tripsList.length === 0 ? (
            <>
              <div className="no-trips-container">
                <img
                  src="https://res.cloudinary.com/dt7mi4nem/image/upload/v1741297116/Frame_1000003903_1_eqfbo7.png"
                  className="no-trips-image"
                  alt="no trips"
                />
                <h1 className="no-trips-heading">No upcoming trips.</h1>
                <p className="no-trips-description">
                  When you book a trip, you will see your trip details here.
                </p>
                <Link className="link" to="/book-a-new-trip">
                  <button type="button" className="book-a-new-trip-button">
                    Book a new trip
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="my-trips-container">
                <h1 className="my-trips-heading">My Trips</h1>
                <ul className="my-trips-list">
                  {tripsList.map(eachTrip => (
                    <TripItem key={eachTrip.id} tripDetails={eachTrip} />
                  ))}
                </ul>
              </div>
            </>
          )}
          <Footer activeNavbarItem="MY_TRIPS" />
        </>
      )
    }}
  </TripsListContext.Consumer>
)

export default MyTrips
