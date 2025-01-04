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
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white w-full py-4">
            Blogs App 📝
          </h2>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/login"
                className="text-accent2 hover:text-accent-hover font-bold"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </>
    )
  }
  return (
    <>
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <nav>
          <h2 className="text-2xl font-bold text-white w-full py-4">
            Blogs App 📝
          </h2>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-400">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/users" className="text-blue-400">
                Users
              </Link>
            </li>
          </ul>
        </nav>
        <p className="text-white">
          Welcome <b>{user.username}</b>{' '}
          <button
            onClick={handleLogOut}
            className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
          >
            Log Out
          </button>
        </p>
      </div>
    </>
  )
}

export default Navbar
