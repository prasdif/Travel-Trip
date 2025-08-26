import {Component} from 'react'
import {MdErrorOutline} from 'react-icons/md'
import {v4 as uuidv4} from 'uuid'

import Footer from '../Footer'
import Header from '../Header'

import TripsListContext from '../../context/TripsListContext'

import './index.css'

const stepsList = [
  {stepId: 'YOUR_DETAILS', displayText: 'Your Details'},
  {stepId: 'DATE_SELECTION', displayText: 'Date Selection'},
  {stepId: 'GUESTS', displayText: 'Guests'},
  {stepId: 'TRAVEL_ASSISTANCE', displayText: 'Travel Assistance'},
  {stepId: 'CONFIRMATION', displayText: 'Confirmation'},
]

const travelAssistanceList = [
  {value: 'car', displayText: 'Car'},
  {value: 'flight', displayText: 'Flight'},
  {value: 'bus', displayText: 'Bus'},
  {value: 'train', displayText: 'Train'},
]

class BookTrip extends Component {
  state = {
    activeStep: stepsList[0].stepId,
    stepOneCompletionStatus: 'PENDING',
    stepTwoCompletionStatus: 'PENDING',
    stepThreeCompletionStatus: 'PENDING',
    stepFourCompletionStatus: 'PENDING',
    stepFiveCompletionStatus: 'PENDING',
    name: '',
    startLocation: '',
    endLocation: '',
    isNameEmpty: false,
    isStartLocationEmpty: false,
    isEndLocationEmpty: false,
    startDate: '',
    endDate: '',
    isStartDateEmpty: false,
    isEndDateEmpty: false,
    isEndDateLesserThanStartDate: false,
    adultsCount: 1,
    childrenCount: 0,
    infantsCount: 0,
    isTravelAssistanceChecked: false,
    travelAssistance: '',
    isTripConfirmed: false,
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeStartLocation = event => {
    this.setState({startLocation: event.target.value})
  }

  onChangeEndLocation = event => {
    this.setState({endLocation: event.target.value})
  }

  onSubmitYourDetailsForm = event => {
    event.preventDefault()

    const {name, startLocation, endLocation} = this.state

    if (name !== '' && startLocation !== '' && endLocation !== '') {
      this.setState({
        stepOneCompletionStatus: 'COMPLETED',
        activeStep: stepsList[1].stepId,
        isNameEmpty: false,
        isStartLocationEmpty: false,
        isEndLocationEmpty: false,
      })
    } else {
      this.setState({stepOneCompletionStatus: 'PENDING'})

      if (name === '') {
        this.setState({isNameEmpty: true})
      } else {
        this.setState({isNameEmpty: false})
      }
      if (startLocation === '') {
        this.setState({isStartLocationEmpty: true})
      } else {
        this.setState({isStartLocationEmpty: false})
      }
      if (endLocation === '') {
        this.setState({isEndLocationEmpty: true})
      } else {
        this.setState({isEndLocationEmpty: false})
      }
    }
  }

  renderYourDetailsView = () => {
    const {
      name,
      startLocation,
      endLocation,
      isNameEmpty,
      isStartLocationEmpty,
      isEndLocationEmpty,
    } = this.state

    const nameRedBorder = isNameEmpty ? 'red-border' : ''

    const nameRedPlaceholderText = isNameEmpty ? 'red-placeholder-text' : ''

    const startLocationRedBorder = isStartLocationEmpty ? 'red-border' : ''

    const startLocationRedPlaceholderText = isStartLocationEmpty
      ? 'red-placeholder-text'
      : ''

    const endLocationRedBorder = isEndLocationEmpty ? 'red-border' : ''

    const endLocationRedPlaceholderText = isEndLocationEmpty
      ? 'red-placeholder-text'
      : ''

    return (
      <div className="your-details-container">
        <h1 className="your-details-heading">Your Details</h1>
        <p className="your-details-description">
          Enter your name and location details
        </p>
        <form
          className="your-details-form"
          onSubmit={this.onSubmitYourDetailsForm}
        >
          <div className="name-input-container">
            <label htmlFor="name" className="label">
              Name
            </label>
            <br />
            <div
              className={`name-input-and-error-icon-container ${nameRedBorder}`}
            >
              <input
                type="text"
                placeholder="Enter name"
                className={`name-input ${nameRedPlaceholderText}`}
                id="name"
                value={name}
                onChange={this.onChangeName}
              />
              {isNameEmpty && <MdErrorOutline size="20" color="#ef4444" />}
            </div>
          </div>
          {isNameEmpty && <p className="error-message">Enter your name</p>}

          <div className="start-location-input-container">
            <label htmlFor="startLocation" className="label">
              Start location
            </label>
            <br />
            <div
              className={`start-location-input-and-error-icon-container ${startLocationRedBorder}`}
            >
              <input
                type="text"
                placeholder="Enter name"
                className={`start-location-input ${startLocationRedPlaceholderText}`}
                id="startLocation"
                value={startLocation}
                onChange={this.onChangeStartLocation}
              />
              {isStartLocationEmpty && (
                <MdErrorOutline size="20" color="#ef4444" />
              )}
            </div>
          </div>
          {isStartLocationEmpty && (
            <p className="error-message">Enter your start location</p>
          )}

          <div className="end-location-input-container">
            <label htmlFor="endLocation" className="label">
              End location
            </label>
            <br />
            <div
              className={`end-location-input-and-error-icon-container ${endLocationRedBorder}`}
            >
              <input
                type="text"
                placeholder="Enter end location"
                className={`end-location-input ${endLocationRedPlaceholderText}`}
                id="endLocation"
                value={endLocation}
                onChange={this.onChangeEndLocation}
              />
              {isEndLocationEmpty && (
                <MdErrorOutline size="20" color="#ef4444" />
              )}
            </div>
          </div>
          {isEndLocationEmpty && (
            <p className="error-message">Enter your end location</p>
          )}

          <div className="next-button-container">
            <button type="submit" className="next-button">
              Next
            </button>
          </div>
        </form>
      </div>
    )
  }

  onChangeStartDate = event => {
    this.setState({startDate: event.target.value})
  }

  onChangeEndDate = event => {
    this.setState({endDate: event.target.value})
  }

  onSubmitDateSelectionForm = event => {
    event.preventDefault()

    const {startDate, endDate} = this.state

    if (startDate !== '' && endDate !== '') {
      if (endDate < startDate) {
        this.setState({
          isEndDateLesserThanStartDate: true,
          isEndDateEmpty: false,
          isStartDateEmpty: false,
          stepTwoCompletionStatus: 'PENDING',
        })
      } else {
        this.setState({
          stepTwoCompletionStatus: 'COMPLETED',
          activeStep: stepsList[2].stepId,
          isEndDateEmpty: false,
          isStartDateEmpty: false,
          isEndDateLesserThanStartDate: false,
        })
      }
    } else {
      this.setState({stepTwoCompletionStatus: 'PENDING'})

      if (startDate === '') {
        this.setState({isStartDateEmpty: true})
      } else {
        this.setState({isStartDateEmpty: false})
      }
      if (endDate === '') {
        this.setState({isEndDateEmpty: true})
      } else {
        this.setState({isEndDateEmpty: false})
      }
    }
  }

  onGoToYourDetailsForm = () => {
    this.setState({
      activeStep: stepsList[0].stepId,
      stepOneCompletionStatus: 'PENDING',
    })
  }

  renderDateSelectionView = () => {
    const {
      startDate,
      endDate,
      isStartDateEmpty,
      isEndDateEmpty,
      isEndDateLesserThanStartDate,
    } = this.state

    const startDateRedBorder = isStartDateEmpty ? 'red-border' : ''

    const startDateRedPlaceholderText = isStartDateEmpty
      ? 'red-placeholder-text'
      : ''

    const endDateRedBorder = isEndDateEmpty ? 'red-border' : ''

    const endDateRedPlaceholderText = isEndDateEmpty
      ? 'red-placeholder-text'
      : ''

    return (
      <div className="date-selection-container">
        <h1 className="date-selection-heading">Date Selection</h1>
        <p className="date-selection-description">
          Select your Start and End Date.
        </p>
        <form
          className="date-selection-form"
          onSubmit={this.onSubmitDateSelectionForm}
        >
          <div className="start-date-input-container">
            <label htmlFor="startDate" className="label">
              Start Date
            </label>
            <br />
            <input
              type="date"
              className={`start-date-input ${startDateRedBorder} ${startDateRedPlaceholderText}`}
              id="startDate"
              value={startDate}
              onChange={this.onChangeStartDate}
            />
          </div>
          {isStartDateEmpty && (
            <p className="error-message">Select start date</p>
          )}
          <div className="end-date-input-container">
            <label htmlFor="endDate" className="label">
              End Date
            </label>
            <br />
            <input
              type="date"
              className={`end-date-input ${endDateRedBorder} ${endDateRedPlaceholderText}`}
              id="endDate"
              value={endDate}
              onChange={this.onChangeEndDate}
            />
          </div>
          {isEndDateEmpty && <p className="error-message">Select end date</p>}
          {isEndDateLesserThanStartDate && (
            <p className="error-message">
              The end date cannot be less than the start date
            </p>
          )}
          <div className="previous-and-next-button-container">
            <button
              type="button"
              className="previous-button"
              onClick={this.onGoToYourDetailsForm}
            >
              Previous
            </button>
            <button type="submit" className="next-button">
              Next
            </button>
          </div>
        </form>
      </div>
    )
  }

  onDecrementAdultsCount = () => {
    const {adultsCount} = this.state

    if (adultsCount > 1) {
      this.setState(prevState => ({adultsCount: prevState.adultsCount - 1}))
    }
  }

  onIncrementAdultsCount = () => {
    this.setState(prevState => ({adultsCount: prevState.adultsCount + 1}))
  }

  onDecrementChildrenCount = () => {
    const {childrenCount} = this.state

    if (childrenCount > 0) {
      this.setState(prevState => ({childrenCount: prevState.childrenCount - 1}))
    }
  }

  onIncrementChildrenCount = () => {
    this.setState(prevState => ({childrenCount: prevState.childrenCount + 1}))
  }

  onDecrementInfantsCount = () => {
    const {infantsCount} = this.state

    if (infantsCount > 0) {
      this.setState(prevState => ({infantsCount: prevState.infantsCount - 1}))
    }
  }

  onIncrementInfantsCount = () => {
    this.setState(prevState => ({infantsCount: prevState.infantsCount + 1}))
  }

  onGoToDateSelectionForm = () => {
    this.setState({
      activeStep: stepsList[1].stepId,
      stepTwoCompletionStatus: 'PENDING',
    })
  }

  onGoToTravelAssistanceForm = () => {
    this.setState({
      activeStep: stepsList[3].stepId,
      stepThreeCompletionStatus: 'COMPLETED',
    })
  }

  renderGuestsView = () => {
    const {adultsCount, childrenCount, infantsCount} = this.state

    return (
      <div className="guests-container">
        <h1 className="guests-heading">Guests</h1>
        <p className="guests-description">Select your Guests</p>
        <div className="guests-list-and-previous-and-next-button-container">
          <ul className="guests-list">
            <li className="guest-item">
              <div>
                <p className="guest-item-name">Adults</p>
                <p className="guest-item-age">Age 13 or above</p>
              </div>
              <div className="guest-item-buttons-container">
                <button
                  type="button"
                  className="guest-item-decrement-button"
                  onClick={this.onDecrementAdultsCount}
                >
                  -
                </button>
                <p className="guest-item-count">{adultsCount}</p>
                <button
                  type="button"
                  className="guest-item-increment-button"
                  onClick={this.onIncrementAdultsCount}
                >
                  +
                </button>
              </div>
            </li>
            <hr className="guests-hr-line" />
            <li className="guest-item">
              <div>
                <p className="guest-item-name">Children</p>
                <p className="guest-item-age">Age 2-12</p>
              </div>
              <div className="guest-item-buttons-container">
                <button
                  type="button"
                  className="guest-item-decrement-button"
                  onClick={this.onDecrementChildrenCount}
                >
                  -
                </button>
                <p className="guest-item-count">{childrenCount}</p>
                <button
                  type="button"
                  className="guest-item-increment-button"
                  onClick={this.onIncrementChildrenCount}
                >
                  +
                </button>
              </div>
            </li>
            <hr className="guests-hr-line" />
            <li className="guest-item">
              <div>
                <p className="guest-item-name">Infants</p>
                <p className="guest-item-age">Under 2</p>
              </div>
              <div className="guest-item-buttons-container">
                <button
                  type="button"
                  className="guest-item-decrement-button"
                  onClick={this.onDecrementInfantsCount}
                >
                  -
                </button>
                <p className="guest-item-count">{infantsCount}</p>
                <button
                  type="button"
                  className="guest-item-increment-button"
                  onClick={this.onIncrementInfantsCount}
                >
                  +
                </button>
              </div>
            </li>
          </ul>
          <div className="previous-and-next-button-container">
            <button
              type="button"
              className="previous-button"
              onClick={this.onGoToDateSelectionForm}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={this.onGoToTravelAssistanceForm}
              className="next-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  }

  onToggleTravelAssistance = () => {
    const {isTravelAssistanceChecked} = this.state

    if (isTravelAssistanceChecked) {
      this.setState({travelAssistance: ''})
    } else {
      this.setState({travelAssistance: travelAssistanceList[0].value})
    }

    this.setState(prevState => ({
      isTravelAssistanceChecked: !prevState.isTravelAssistanceChecked,
    }))
  }

  onChangeTravelAssistance = event => {
    this.setState({travelAssistance: event.target.value})
  }

  onGoToGuestsForm = () => {
    this.setState({
      activeStep: stepsList[2].stepId,
      stepThreeCompletionStatus: 'PENDING',
    })
  }

  onGoToConfirmationForm = () => {
    this.setState({
      activeStep: stepsList[4].stepId,
      stepFourCompletionStatus: 'COMPLETED',
    })
  }

  renderTravelAssistanceView = () => {
    const {isTravelAssistanceChecked, travelAssistance} = this.state

    return (
      <div className="travel-assistance-container">
        <h1 className="travel-assistance-heading">Travel Assistance</h1>
        <p className="travel-assistance-description">
          Select your Travel Assistance.
        </p>
        <div className="travel-assistance-checkbox-and-select-and-previous-and-next-button-container">
          <div className="travel-assistance-checkbox-container">
            <input
              id="travelAssistanceCheckbox"
              type="checkbox"
              className="travel-assistance-checkbox"
              onChange={this.onToggleTravelAssistance}
            />
            <label
              htmlFor="travelAssistanceCheckbox"
              className="travel-assistance-checkbox-label"
            >
              Travel Assistance Needed
            </label>
          </div>

          {isTravelAssistanceChecked && (
            <div className="travel-assistance-select-container">
              <label
                htmlFor="travelAssistanceSelect"
                className="travel-assistance-select-label"
              >
                Travel Assistance
              </label>
              <br />
              <select
                id="travelAssistanceSelect"
                className="travel-assistance-select"
                onChange={this.onChangeTravelAssistance}
                value={travelAssistance}
              >
                {travelAssistanceList.map(eachTravelAssistance => (
                  <option
                    key={eachTravelAssistance.value}
                    value={eachTravelAssistance.value}
                  >
                    {eachTravelAssistance.displayText}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="previous-and-next-button-container">
            <button
              type="button"
              className="previous-button"
              onClick={this.onGoToGuestsForm}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={this.onGoToConfirmationForm}
              className="next-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  }

  onCancelTrip = () => {
    this.setState({
      activeStep: stepsList[0].stepId,
      stepOneCompletionStatus: 'PENDING',
      stepTwoCompletionStatus: 'PENDING',
      stepThreeCompletionStatus: 'PENDING',
      stepFourCompletionStatus: 'PENDING',
      stepFiveCompletionStatus: 'PENDING',
      name: '',
      startLocation: '',
      endLocation: '',
      isNameEmpty: false,
      isStartLocationEmpty: false,
      isEndLocationEmpty: false,
      startDate: '',
      endDate: '',
      isStartDateEmpty: false,
      isEndDateEmpty: false,
      isEndDateLesserThanStartDate: false,
      adultsCount: 1,
      childrenCount: 0,
      infantsCount: 0,
      isTravelAssistanceChecked: false,
      travelAssistance: '',
    })
  }

  renderConfirmationView = () => {
    const {
      name,
      startLocation,
      endLocation,
      startDate,
      endDate,
      adultsCount,
      childrenCount,
      infantsCount,
      travelAssistance,
    } = this.state

    const guests = adultsCount + childrenCount + infantsCount

    const travelAssistanceItem = travelAssistanceList.find(
      eachTravelAssistance => eachTravelAssistance.value === travelAssistance,
    )

    let travelAssistanceDisplayText = '-'
    if (travelAssistanceItem !== undefined) {
      travelAssistanceDisplayText = travelAssistanceItem.displayText
    }

    return (
      <TripsListContext.Consumer>
        {value => {
          const {addTrip} = value

          const onConfirmTrip = () => {
            addTrip({id: uuidv4(), endLocation, startDate, endDate})

            this.setState({
              isTripConfirmed: true,
              activeStep: null,
              stepFiveCompletionStatus: 'COMPLETED',
            })
          }

          return (
            <div className="confirmation-container">
              <h1 className="confirmation-heading">Confirmation</h1>
              <p className="confirmation-description">Confirm your details</p>
              <div className="confirmation-list-and-cancel-and-confirm-button-container">
                <ul className="confirmation-list">
                  <li className="confirmation-item">
                    <p className="confirmation-label">Name:</p>
                    <p className="confirmation-value">{name}</p>
                  </li>
                  <li className="confirmation-item">
                    <p className="confirmation-label">Start Location:</p>
                    <p className="confirmation-value">{startLocation}</p>
                  </li>
                  <li className="confirmation-item">
                    <p className="confirmation-label">End Location:</p>
                    <p className="confirmation-value">{endLocation}</p>
                  </li>
                  <li className="confirmation-item">
                    <p className="confirmation-label">Start Date:</p>
                    <p className="confirmation-value">{startDate}</p>
                  </li>
                  <li className="confirmation-item">
                    <p className="confirmation-label">End Date:</p>
                    <p className="confirmation-value">{endDate}</p>
                  </li>
                  <li className="confirmation-item">
                    <p className="confirmation-label">Guests:</p>
                    <p className="confirmation-value">{guests}</p>
                  </li>
                  <li className="confirmation-item">
                    <p className="confirmation-label">Travel Assistance:</p>
                    <p className="confirmation-value">
                      {travelAssistanceDisplayText}
                    </p>
                  </li>
                </ul>
                <div className="cancel-and-confirm-button-container">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={this.onCancelTrip}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={onConfirmTrip}
                    className="confirm-button"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )
        }}
      </TripsListContext.Consumer>
    )
  }

  renderStep = () => {
    const {activeStep} = this.state

    switch (activeStep) {
      case stepsList[0].stepId:
        return this.renderYourDetailsView()
      case stepsList[1].stepId:
        return this.renderDateSelectionView()
      case stepsList[2].stepId:
        return this.renderGuestsView()
      case stepsList[3].stepId:
        return this.renderTravelAssistanceView()
      case stepsList[4].stepId:
        return this.renderConfirmationView()
      default:
        return null
    }
  }

  onBookANewTrip = () => {
    this.setState({
      activeStep: stepsList[0].stepId,
      stepOneCompletionStatus: 'PENDING',
      stepTwoCompletionStatus: 'PENDING',
      stepThreeCompletionStatus: 'PENDING',
      stepFourCompletionStatus: 'PENDING',
      stepFiveCompletionStatus: 'PENDING',
      name: '',
      startLocation: '',
      endLocation: '',
      isNameEmpty: false,
      isStartLocationEmpty: false,
      isEndLocationEmpty: false,
      startDate: '',
      endDate: '',
      isStartDateEmpty: false,
      isEndDateEmpty: false,
      isEndDateLesserThanStartDate: false,
      adultsCount: 1,
      childrenCount: 0,
      infantsCount: 0,
      isTravelAssistanceChecked: false,
      travelAssistance: '',
      isTripConfirmed: false,
    })
  }

  renderConfirmedMessage = () => (
    <div className="confirmed-message-container">
      <div className="confirmed-message-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
          className="confirmed-message-image"
          alt="success"
        />
        <h1 className="confirmed-message-heading">Awesome</h1>
        <p className="confirmed-message-description">
          Your booking has been confirmed.
        </p>
        <button
          type="button"
          className="book-a-new-trip-button"
          onClick={this.onBookANewTrip}
        >
          Book a New Trip
        </button>
      </div>
    </div>
  )

  render() {
    const {
      activeStep,
      stepOneCompletionStatus,
      stepTwoCompletionStatus,
      stepThreeCompletionStatus,
      stepFourCompletionStatus,
      stepFiveCompletionStatus,
      isTripConfirmed,
    } = this.state

    let stepNumber = 0

    const stepsListWithCompletionStatus = [
      {
        stepId: 'YOUR_DETAILS',
        displayText: 'Your Details',
        completionStatus: stepOneCompletionStatus,
      },
      {
        stepId: 'DATE_SELECTION',
        displayText: 'Date Selection',
        completionStatus: stepTwoCompletionStatus,
      },
      {
        stepId: 'GUESTS',
        displayText: 'Guests',
        completionStatus: stepThreeCompletionStatus,
      },
      {
        stepId: 'TRAVEL_ASSISTANCE',
        displayText: 'Travel Assistance',
        completionStatus: stepFourCompletionStatus,
      },
      {
        stepId: 'CONFIRMATION',
        displayText: 'Confirmation',
        completionStatus: stepFiveCompletionStatus,
      },
    ]

    return (
      <>
        <Header />
        <div className="book-a-new-trip-container">
          <div className="book-a-new-trip-card">
            <div className="book-a-new-trip-card-left-container">
              <ul className="steps-list">
                {stepsListWithCompletionStatus.map(eachStep => {
                  stepNumber += 1

                  const stepItemNumberActive =
                    eachStep.stepId === activeStep
                      ? 'step-item-number-active'
                      : ''

                  const stepItemNameActive =
                    eachStep.stepId === activeStep
                      ? 'step-item-name-active'
                      : ''

                  return (
                    <li key={eachStep.stepId} className="step-item">
                      {eachStep.completionStatus === 'COMPLETED' ? (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
                          className="step-item-completion-image"
                          alt={eachStep.displayText}
                        />
                      ) : (
                        <p
                          className={`step-item-number ${stepItemNumberActive}`}
                        >
                          {stepNumber}
                        </p>
                      )}
                      <p className={`step-item-name ${stepItemNameActive}`}>
                        {eachStep.displayText}
                      </p>
                    </li>
                  )
                })}
              </ul>
              <ul className="top-hr-lines-list">
                {stepsList.map(eachStep => {
                  const topHrLineActive =
                    eachStep.stepId === activeStep ? 'top-hr-line-active' : ''

                  return (
                    <li key={eachStep.stepId}>
                      <hr className={`top-hr-line ${topHrLineActive}`} />
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="book-a-new-trip-card-right-container">
              {isTripConfirmed
                ? this.renderConfirmedMessage()
                : this.renderStep()}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default BookTrip
