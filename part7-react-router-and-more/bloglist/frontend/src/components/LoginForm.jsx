import { useState } from 'react'
import login from '../services/login'
import blogService from '../services/blogs'

import { useDispatch } from 'react-redux'
import { setNotification } from '../state/notificationSlice'
import { setUser } from '../state/userSlice'

import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await login({ username, password })
      if (response) {
        window.localStorage.setItem('bloglistAppUser', JSON.stringify(response))
        await blogService.setToken(response.token)
        setUsername('')
        setPassword('')
        dispatch(setUser(response))
        dispatch(
          setNotification({
            title: 'Logged in successfully',
          })
        )
        navigate('/')
      }
    } catch (error) {
      console.error('Login failed', error)
      dispatch(
        setNotification({
          title: 'Login failed',
          text: 'Wrong username/password or no service at the moment. Please try again',
          icon: 'error',
        })
      )
    }
  }
  return (
    <div className="bg-secondary rounded-md p-4 text-center">
      <h2>Log-in to application</h2>
      <form onSubmit={handleLogin}>
        <div className="my-4 flex-row gap-2">
          <label htmlFor="username" className="mr-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="my-4 flex-row gap-2">
          <label htmlFor="password" className="mr-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="bg-accent2 text-black px-2 py-1 rounded hover:pointer"
        >
          Log In
        </button>
      </form>
    </div>
  )
}

export default LoginForm
