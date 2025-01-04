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
      <div className="mb-3">
        <label htmlFor="title" className="mr-3">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          autoComplete="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="author" className="mr-3">
          Author
        </label>
        <input
          type="text"
          name="author"
          id="author"
          autoComplete="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          className="text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="url" className="mr-3">
          Url
        </label>
        <input
          type="text"
          name="url"
          id="url"
          autoComplete="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className="text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save 💾
      </button>
    </form>
  )
}

export default BlogForm
