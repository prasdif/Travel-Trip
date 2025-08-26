import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'

import Login from './components/Login'
import Home from './components/Home'
import BookANewTrip from './components/BookTrip'
import MyTrips from './components/MyTrips'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import TripsListContext from './context/TripsListContext'

import './App.css'

class App extends Component {
  state = {
    tripsList: [],
  }

  addTrip = trip => {
    this.setState(prevState => ({tripsList: [...prevState.tripsList, trip]}))
  }

  removeTrip = id => {
    const {tripsList} = this.state

    const updatedTripsList = tripsList.filter(eachTrip => eachTrip.id !== id)

    this.setState({tripsList: updatedTripsList})
  }

  render() {
    const {tripsList} = this.state

    return (
      <TripsListContext.Provider
        value={{tripsList, addTrip: this.addTrip, removeTrip: this.removeTrip}}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/book-a-new-trip"
            component={BookANewTrip}
          />
          <ProtectedRoute exact path="/my-trips" component={MyTrips} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </TripsListContext.Provider>
    )
  }
}

export default App
