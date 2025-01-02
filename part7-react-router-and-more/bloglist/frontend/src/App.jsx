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
import useMutateBlog from './hooks/useMutateBlog'
import { QueryClient } from '@tanstack/react-query'

const App = () => {
  const { state, dispatch } = useAppContext()
  const [confirmationCallback, setConfirmationCallback] = useState(null)
  const { data, error, isLoading } = useFetchData()
  const updateBlogMutation = useMutateBlog(blogService.updateBlog)
  const deleteBlogMutation = useMutateBlog(blogService.removeBlog)
  console.log({state});
  

  useEffect(() => {
    const savedUser = window.localStorage.getItem('bloglistAppUser')
    if (savedUser) {
      let userToSave = JSON.parse(savedUser)
      dispatch({
        type:'SET_USER',
        payload: userToSave
      })
      blogService.setToken(userToSave.token)
    }
  }, [dispatch])

  useEffect(() => {
    if (data) {
      const sortedBlogs = sortBlogsByLikes(data)
      dispatch({
        type: 'SET_BLOGS',
        payload: sortedBlogs,
      })
    }
  }, [data, dispatch])

  const handleLogOut = () => {
    window.localStorage.removeItem('bloglistAppUser')
    dispatch({type:'CLEAR_USER'})
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        title: 'Logged out successfully',
        icon: 'success',
        timer: 4000,
        toast: true,
        position: 'top-right',
      },
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

    updateBlogMutation.mutate({id:blog.id, blog: putRequestObject}, {
      onSuccess: () => {
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: {
            title: 'Liked :)',
          },
        })
        QueryClient.setQueryData(['blogs'], (oldData) => {
          return oldData.map((b) =>
            b.id === blog.id ? { ...b, likes: data.likes } : b
          );
        });
      }
    })
  }

  const handleRemove = async (blog) => {
    const onConfirm = async () => {      
      deleteBlogMutation.mutate(blog.id, {
        onSuccess: () => {
          dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
              title: 'Deleted!',
              text: 'The blog has been deleted.',
              icon: 'success',
            },
          })
        },
        onError: () => {
          dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
              title: 'Error :(',
              text: 'Failed to delete a blog',
              icon: 'error',
            },
          })
        },
      })
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
      },
    })
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  if (!state.user.username) {
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
      <div>
        <p>
          Welcome <b>{state.user.username}</b>{' '}
          <button onClick={handleLogOut}>Log Out</button>
        </p>
        <hr />
        <Togglable buttonLabel="New Blog">
          <BlogForm user={state.user} />
        </Togglable>
        {state.blogs.map((blog) => {
          let removeButtonShown = false
          if (blog.user) {
            removeButtonShown = blog.user.username === state.user.username
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
      <ToastNotification />
      <ConfirmationDialog onConfirm={confirmationCallback} />
    </>
  )
}

export default App
