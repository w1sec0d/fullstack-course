import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import ToastNotification from './components/ToastNotification'

import blogService from './services/blogs'
import { useAppContext } from './state/useAppContext'
import ConfirmationDialog from './components/ConfirmationDialog'

const App = () => {
  const {dispatch} = useAppContext()
  const [user, setUser] = useState(null)
  const [confirmationCallback, setConfirmationCallback] = useState(null)
  const [blogs, setBlogs] = useState([])

  async function fetchBlogs() {
    const fetchedBlogs = await blogService.getBlogs()
    const sortedBlogs = [...fetchedBlogs].sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

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
    dispatch({
      type: "SET_NOTIFICATION",
      payload: {
        title: 'Logged out successfully',
        icon: 'success',
        timer: 4000,
        toast: true,
        position: 'top-right',
      }
    })
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
      let updatedBlogs = [...blogs]
      const blogIndexToUpdate = updatedBlogs.findIndex(
        (oldBlog) => oldBlog.id === blog.id
      )
      updatedBlogs[blogIndexToUpdate].likes += 1
      setBlogs(updatedBlogs)
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          title: 'Liked :)'
        }
      })
    }
  }

  const handleRemove = async (blog) => {

    const onConfirm = async () => {
      try {
        await blogService.removeBlog(blog.id)

        setBlogs((oldBlogs) =>
          oldBlogs.filter((oldBlog) => oldBlog.id != blog.id)
        )

        dispatch({
          type: 'SET_NOTIFICATION',
          payload: {
            title: 'Deleted!',
            text: 'The blog has been deleted.',
            icon: 'success'
          }
        })
      } catch {
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: {
            title: 'Error :(',
            text: 'Failed to delete a blog',
            icon: 'error'
          }
        })
      }
    }

    setConfirmationCallback(() => onConfirm)
    
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        title: `Are you sure ?`,
        text: `Do you want to delete ${blog.title} blog?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        isConfirmation: true,        
      }
    })
  }

  if (user === null) {
    return (
      <>
        <h2>Blogs</h2>
        <LoginForm setUser={setUser} />
        <ToastNotification />
        <ConfirmationDialog onConfirm={confirmationCallback}/>
      </>
    )
  }  

  return (
    <>
      <h2>Blogs</h2>
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
              handleRemove={handleRemove}
              showRemove={removeButtonShown}
            />
          )
        })}
      </div>
      <ToastNotification/>
      <ConfirmationDialog onConfirm={confirmationCallback}/>
    </>
  )
}

export default App