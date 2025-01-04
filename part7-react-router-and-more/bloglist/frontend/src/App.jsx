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
import UserPage from './components/pages/UserPage'
import BlogPage from './components/pages/BlogPage'

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
      <div className="bg-gray-900 min-h-screen text-white">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                user ? <BloglistPage /> : <Navigate replace to="/login" />
              }
            />
            <Route path="/users" element={<UserlistPage />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/blogs/:id" element={<BlogPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
