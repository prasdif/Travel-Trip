import {Component} from 'react'
import {BiShow, BiHide} from 'react-icons/bi'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowPassword: false,
    isSubmitError: false,
    errorMessage: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onToggleShowPassword = () => {
    this.setState(prevstate => ({
      isShowPassword: !prevstate.isShowPassword,
    }))
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {
      username,
      password,
    }

    const loginApiUrl = 'https://apis.ccbp.in/login'

    const options = {
      body: JSON.stringify(userDetails),
      method: 'POST',
    }

    const response = await fetch(loginApiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const jwtToken = fetchedData.jwt_token

      Cookies.set('jwt_token', jwtToken, {expires: 30})

      const {history} = this.props

      history.replace('/')
    } else {
      const fetchedData = await response.json()

      this.setState({
        isSubmitError: true,
        errorMessage: fetchedData.error_msg,
      })
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to='/' />
    }

    const {username, password, isShowPassword, isSubmitError, errorMessage} =
      this.state

    return (
      <div className='login-container'>
        <div className='login-card'>
          <h1 className='login-website-logo'>Travel Trip</h1>
          <form onSubmit={this.onSubmitLoginForm}>
            <div className='username-input-container'>
              <label htmlFor='username' className='label'>
                Username
              </label>
              <br />
              <input
                type='text'
                className='username-input'
                placeholder='Username'
                id='username'
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className='password-input-container'>
              <label htmlFor='password' className='label'>
                Password
              </label>
              <br />
              <div className='password-input-and-show-password-button-container'>
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  className='password-input'
                  placeholder='Password'
                  id='password'
                  onChange={this.onChangePassword}
                  value={password}
                />
                <button
                  type='button'
                  className='show-password-button'
                  onClick={this.onToggleShowPassword}
                  data-testid='show-password'
                >
                  {isShowPassword ? (
                    <BiHide size='20' color='#64748B' />
                  ) : (
                    <BiShow size='20' color='#64748B' />
                  )}
                </button>
              </div>
            </div>
            {isSubmitError && <p className='error-message'>{errorMessage}</p>}
            <button type='submit' className='login-button'>
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
