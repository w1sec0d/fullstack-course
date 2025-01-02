import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import BloglistPage from './components/pages/BloglistPage'
import LoginPage from './components/pages/LoginPage'
import { useSelector } from 'react-redux'
import Navbar from './components/pages/Navbar'

const App = () => {
  const user = useSelector((state) => state.user)

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
        </Routes>
      </div>
    </Router>
  )
}

export default App
