import React from 'react'

const TripsListContext = React.createContext({
  tripsList: [],
  addTrip: () => {},
  removeTrip: () => {},
})

export default TripsListContext
