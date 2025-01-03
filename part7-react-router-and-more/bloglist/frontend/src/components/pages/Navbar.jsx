import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearUser } from '../../state/userSlice'
import { setNotification } from '../../state/notificationSlice'

const Navbar = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogOut = () => {
    navigate('/login')
    window.localStorage.removeItem('bloglistAppUser')
    dispatch(clearUser())
    dispatch(
      setNotification({
        title: 'Logged out successfully',
      })
    )
  }

  if (!user) {
    return (
      <>
        <h2>Blogs</h2>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </>
    )
  }
  return (
    <>
      <h2>Blogs</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Blogs</Link>
          </li>
        </ul>
      </nav>
      <p>
        Welcome <b>{user.username}</b>{' '}
        <button onClick={handleLogOut}>Log Out</button>
      </p>
      <hr />
    </>
  )
}

export default Navbar
