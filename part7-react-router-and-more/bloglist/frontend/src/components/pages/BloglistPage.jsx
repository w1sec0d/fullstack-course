import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Routing
import { useNavigate } from 'react-router-dom'

// Components
import BlogForm from '../BlogForm'
import Togglable from '../Togglable'
import Blog from '../Blog'
import ToastNotification from '../ToastNotification'
import ConfirmationDialog from '../ConfirmationDialog'

// Services
import blogService from '../../services/blogs'

// State Logic
import { setNotification, setConfirmation } from '../../state/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'

// Sorting logic
import { sortBlogsByLikes } from '../../utils/blogSorting'
import { setBlogs } from '../../state/blogSlice'
import { setUser } from '../../state/userSlice'

const BloglistPage = () => {
  const [confirmationCallback, setConfirmationCallback] = useState(null)
  const user = useSelector((state) => state.user)
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getBlogs,
    onSuccess: (data) => {
      const sortedBlogs = sortBlogsByLikes(data)
      dispatch(setBlogs(sortedBlogs))
    },
    onError: () => {
      dispatch(
        setNotification({
          title: 'Failed to fetch blogs',
          icon: 'error',
        })
      )
    },
  })

  const likeMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      dispatch(
        setNotification({
          title: 'Liked successfully!',
          timer: 1000,
        })
      )
    },
    onError: () => {
      dispatch(
        setNotification({
          title: 'Failed to like the blog.',
          icon: 'error',
        })
      )
    },
  })

  const removeMutation = useMutation({
    mutationFn: blogService.removeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      dispatch(
        setNotification({
          title: 'The blog has been deleted.',
          icon: 'success',
        })
      )
    },
    onError: () => {
      dispatch(
        setNotification({
          title: 'Failed to delete the blog.',
          icon: 'error',
        })
      )
    },
  })

  useEffect(() => {
    const savedUser = window.localStorage.getItem('bloglistAppUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

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

    dispatch(
      setConfirmation({
        title: `Are you sure ?`,
        text: `Do you want to delete ${blog.title} blog?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      })
    )
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading blogs</div>
  }

  if (!user) {
    navigate('/')
  }

  return (
    <>
      <ToastNotification />
      <ConfirmationDialog onConfirm={confirmationCallback} />
      <div>
        <Togglable buttonLabel="New Blog">
          <BlogForm user={user} />
        </Togglable>

        {blogs.map((blog) => {
          let removeButtonShown = false
          if (blog.user) {
            removeButtonShown = blog.user.username === user.username
          }
          if (!blog.id) return
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

export default BloglistPage
