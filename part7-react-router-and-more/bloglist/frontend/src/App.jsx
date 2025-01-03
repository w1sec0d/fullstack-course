import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import BloglistPage from './components/pages/BloglistPage'
import LoginPage from './components/pages/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/pages/Navbar'
import { useEffect } from 'react'
import { getUserFromLocalStorage } from './utils/localStorage'
import { setUser } from './state/userSlice'
import UserlistPage from './components/pages/UserlistPage'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const localStorageUser = getUserFromLocalStorage()
    if (localStorageUser) {
      dispatch(setUser(localStorageUser))
    }
  }, [dispatch])

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={user ? <BloglistPage /> : <Navigate replace to="/login" />}
          />
          <Route path="/users" element={<UserlistPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
