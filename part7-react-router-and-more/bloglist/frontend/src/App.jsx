import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'

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
import { setBlogs } from './state/blogSlice'
import { clearUser, setUser } from './state/userSlice'

const App = () => {
  const [confirmationCallback, setConfirmationCallback] = useState(null)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)  
  const queryClient = useQueryClient()

  const { data: blogs, isLoading, isError } = useQuery('blogs', blogService.getBlogs, {
    onSuccess: (data) => {
      const sortedBlogs = sortBlogsByLikes(data)
      dispatch(setBlogs(sortedBlogs))
    },
    onError: () => {
      dispatch(setNotification({
        title: 'Failed to fetch blogs',
        icon: 'error'
      }))
    }
  })

  const likeMutation = useMutation(blogService.updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      dispatch(setNotification({
        title: "Liked successfully!",
        timer: 1000
      }))
    },
    onError: () => {
      dispatch(setNotification({
        title: 'Failed to like the blog.',
        icon: 'error'
      }))
    }
  })

  const removeMutation = useMutation(blogService.removeBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      dispatch(setNotification({
        title: 'The blog has been deleted.',
        icon: 'success'
      }))
    },
    onError: () => {
      dispatch(setNotification({
        title: 'Failed to delete the blog.',
        icon: 'error'
      }))
    }
  })

  useEffect(() => {
    const savedUser = window.localStorage.getItem('bloglistAppUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogOut = () => {
    window.localStorage.removeItem('bloglistAppUser')
    dispatch(clearUser())
    dispatch(setNotification({
      title: "Logged out successfully",
    }))
  }

  const handleLike = (blog) => {
    const putRequestObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    likeMutation.mutate({ id: blog.id, blog: putRequestObject })
  }

  const handleRemove = (blog) => {
    const onConfirm = () => {
      removeMutation.mutate(blog.id)
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading blogs</div>
  }

  if (user === null) {
    return (
      <>
        <h2>Blogs</h2>
        <LoginForm />
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
          <BlogForm user={user} />
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