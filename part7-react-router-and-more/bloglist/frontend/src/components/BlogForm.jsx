import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { setNotification } from '../state/notificationSlice'
import { addBlog } from '../state/blogSlice'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const createBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (data) => {
      // Invalidate the blogs query to refetch the updated list of blogs
      queryClient.invalidateQueries('blogs')

      // Dispatch the action to update the local state
      dispatch(addBlog(data))

      // Clear the form fields
      setTitle('')
      setAuthor('')
      setUrl('')

      // Dispatch a success notification
      dispatch(
        setNotification({
          title: 'Blog created successfully!',
          timer: 1000,
        })
      )
    },
    onError: (error) => {
      // Dispatch an error notification
      dispatch(
        setNotification({
          title: 'Error creating blog',
          message: error.message,
          timer: 1000,
        })
      )
    },
  })

  const handleCreation = async (event) => {
    event.preventDefault()
    createBlogMutation.mutate({ title, author, url })
  }

  return (
    <form onSubmit={handleCreation}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          autoComplete="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          autoComplete="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input
          type="text"
          name="url"
          id="url"
          autoComplete="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default BlogForm
