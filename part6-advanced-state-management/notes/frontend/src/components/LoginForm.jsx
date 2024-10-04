import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={(event) => handleSubmit(event, username, password)}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => {
              setUsername(target.value)
            }}
            data-testid='username'
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value)
            }}
            data-testid='password'
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm
