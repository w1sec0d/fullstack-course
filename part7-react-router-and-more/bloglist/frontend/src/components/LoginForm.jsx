import { useState } from 'react'
import login from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useAppContext } from '../state/useAppContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {dispatch} = useAppContext()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await login({ username, password })
      if (response) {
        window.localStorage.setItem('bloglistAppUser', JSON.stringify(response))
        blogService.setToken(response.token)
        dispatch({
          type: 'SET_USER',
          payload: response
        })
        setUsername('')
        setPassword('')

        dispatch({
          type: "SET_NOTIFICATION",
          payload: {
            title: 'Logged in successfully',
            icon: 'success',
            timer: 4000,
            toast: true,
            position: 'top-right',
          }
        })
      }
    } catch (error) {
      console.error('Login failed', error)
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          title: 'Login failed',
          text: 'Wrong username/password. Please try again',
          icon: 'error',
          toast: true,
          showCloseButton: true,
          position: 'top-right',
        }
      })
    }
  }
  return (
    <>
      <h2>Log-in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </>
  )
}

export default LoginForm