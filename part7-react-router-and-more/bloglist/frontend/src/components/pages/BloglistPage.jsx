import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

// Routing
import { useNavigate } from 'react-router-dom'

// Components
import BlogForm from '../BlogForm'
import Togglable from '../Togglable'
import Blog from '../Blog'
import ToastNotification from '../ToastNotification'

// Services
import blogService from '../../services/blogs'

// State Logic
import { setNotification } from '../../state/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'

// Sorting logic
import { sortBlogsByLikes } from '../../utils/blogSorting'
import { setBlogs } from '../../state/blogSlice'
import { setUser } from '../../state/userSlice'

const BloglistPage = () => {
  const user = useSelector((state) => state.user)
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

  useEffect(() => {
    const savedUser = window.localStorage.getItem('bloglistAppUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  if (isLoading) {
    return <div className="text-white">Loading...</div>
  }

  if (isError) {
    return <div className="text-red-500">Error loading blogs</div>
  }

  if (!user) {
    navigate('/')
  }

  if (blogs) {
    return (
      <div className="text-white">
        <ToastNotification />
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
              <Blog value={blog} key={blog.id} showRemove={removeButtonShown} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default BloglistPage
