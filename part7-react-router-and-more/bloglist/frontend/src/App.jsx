import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import ToastNotification from './components/ToastNotification'
import ConfirmationDialog from './components/ConfirmationDialog'

import blogService from './services/blogs'

import { useAppContext } from './state/useAppContext'
import useFetchData from './hooks/useFetchData'
import { sortBlogsByLikes } from './utils/blogSorting'

const App = () => {
  const {state, dispatch} = useAppContext()
  const [user, setUser] = useState(null)
  const [confirmationCallback, setConfirmationCallback] = useState(null)
  const {data, error, isLoading} = useFetchData();

  useEffect(() => {
    if (data){
      const sortedBlogs = sortBlogsByLikes(data)
      dispatch({
        type: 'SET_BLOGS',
        payload: sortedBlogs
      })
    }
  }, [data, dispatch])

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
      let updatedBlogs = state.blogs
      const blogIndexToUpdate = updatedBlogs.findIndex(
        (oldBlog) => oldBlog.id === blog.id
      )
      updatedBlogs[blogIndexToUpdate].likes += 1

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

        // setBlogs((oldBlogs) =>
        //   oldBlogs.filter((oldBlog) => oldBlog.id != blog.id)
        // )

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
          <BlogForm user={user}/>
        </Togglable>
        {state.blogs.map((blog) => {
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