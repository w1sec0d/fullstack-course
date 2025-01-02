import { useState } from 'react'
import login from '../services/login'
import blogService from '../services/blogs'

import { useDispatch } from 'react-redux'
import { setNotification } from '../state/NotificationSlice'
import { setUser } from '../state/userSlice'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await login({ username, password })
      if (response) {
        window.localStorage.setItem('bloglistAppUser', JSON.stringify(response))
        blogService.setToken(response.token)
        setUsername('')
        setPassword('')
        dispatch(setUser(response))        
        dispatch(setNotification({
          title: 'Logged in successfully',
        }))
      }
    } catch (error) {
      console.error('Login failed', error)
      dispatch(setNotification({
        title: 'Login failed',
        text: 'Wrong username/password or no service at the moment. Please try again',
        icon: 'error',
      }))
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