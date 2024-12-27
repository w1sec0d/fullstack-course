import { useState, useEffect } from 'react'

// Components
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import ToastNotification from './components/ToastNotification'
import ConfirmationDialog from './components/ConfirmationDialog'

// Services
import blogService from './services/blogs'

// State Logic
import { setNotification, setConfirmation } from './state/NotificationSlice'
import { useDispatch, useSelector } from 'react-redux'

// Sorting logic 
import { sortBlogsByLikes } from './utils/blogSorting'
import { deleteBlog, likeBlog, setBlogs } from './state/blogSlice'

const App = () => {
  const [user, setUser] = useState(null)
  const [confirmationCallback, setConfirmationCallback] = useState(null)
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  

  useEffect(() => {
    async function fetchBlogs() {
      const fetchedBlogs = await blogService.getBlogs()
      const sortedBlogs = sortBlogsByLikes(fetchedBlogs)
      
      dispatch(setBlogs(sortedBlogs))
    }
    fetchBlogs()
  },[dispatch])

  useEffect(() => {
    const savedUser = window.localStorage.getItem('bloglistAppUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogOut = () => {
    window.localStorage.removeItem('bloglistAppUser')
    setUser(null)
    dispatch(setNotification({
      title: "Logged out successfully",
    }))
  }

  const handleLike = async (blog) => {
    const putRequestObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    const updatedBlog = await blogService.updateBlog(blog.id, putRequestObject)
    if (updatedBlog) {
      dispatch(likeBlog(blog.id))
      dispatch(setNotification({
        title: "Liked successfully!",
        timer: 1000
      }))
    }
  }

  const handleRemove = async (blog) => {
    const onConfirm = async () => {
      try {
        await blogService.removeBlog(blog.id)
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification({
          title: 'The blog has been deleted.',
          icon: 'success'
        }))
      } catch {
        dispatch(setNotification({
          title: 'Failed to delete the blog.',
          icon: 'error'
        }))
      }
    }

    setConfirmationCallback(() => onConfirm)

    dispatch(setConfirmation({
      title: `Are you sure ?`,
      text: `Do you want to delete ${blog.title} blog?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }))
  }

  if (user === null) {
    return (
      <>
        <h2>Blogs</h2>
        <LoginForm setUser={setUser} />
        <ToastNotification />
        <ConfirmationDialog onConfirm={confirmationCallback} />
      </>
    )
  }

  return (
    <>
      <h2>Blogs</h2>
      <ToastNotification />
      <ConfirmationDialog onConfirm={confirmationCallback} />
      <div>
        <p>
          Welcome <b>{user.username}</b>{' '}
          <button onClick={handleLogOut}>Log Out</button>
        </p>
        <hr />
        <Togglable buttonLabel="New Blog">
          <BlogForm setBlogs={setBlogs} user={user} />
        </Togglable>

        {blogs.map((blog) => {
          let removeButtonShown = false
          if (blog.user) {
            removeButtonShown = blog.user.username === user.username
          }

          return (
            <Blog
              value={blog}
              key={blog.id}
              handleLike={handleLike}
              handleRemove={() => handleRemove(blog)}
              showRemove={removeButtonShown}
            />
          )
        })}
      </div>
    </>
  )
}

export default App