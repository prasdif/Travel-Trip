import TripsListContext from '../../context/TripsListContext'

import './index.css'

const TripItem = props => {
  const {tripDetails} = props

  const {id, endLocation, startDate, endDate} = tripDetails

  return (
    <TripsListContext.Consumer>
      {value => {
        const {removeTrip} = value

        const onRemoveTrip = () => {
          removeTrip(id)
        }

        return (
          <>
            <li className="my-trip-item">
              <h1 className="my-trip-item-location">{endLocation}</h1>
              <div>
                <p className="my-trip-item-date-label">Date</p>
                <p className="my-trip-item-date">
                  {startDate} to {endDate}
                </p>
              </div>
              <button
                type="button"
                className="my-trip-item-cancel-button"
                onClick={onRemoveTrip}
              >
                Cancel
              </button>
            </li>
          </>
        )
      }}
    </TripsListContext.Consumer>
  )
}

export default TripItem
