import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { setNotification } from '../state/NotificationSlice'
import { useDispatch } from 'react-redux'

const BlogForm = ({ creationHandler, setBlogs, user }) => {
  // Blog form state is only used in this component
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleCreation = async (event) => {
    event.preventDefault()
    const request = await blogService.createBlog({ title, author, url })
    const userId = request.user
    let newRequest = { ...request }

    // Adds user info to locally added blog
    newRequest.user = {
      id: userId,
      username: user.username,
      name: user.name,
    }

    if (request) {
      setBlogs((blogs) => blogs.concat(newRequest))
      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(
        setNotification({
          title: "Blog created successfully!",
          timer: 1000
        })
      )
    }
  }

  return (
    <form
      onSubmit={
        creationHandler ? creationHandler(title, author, url) : handleCreation
      }
    >
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
BlogForm.propTypes = {
  creationHandler: PropTypes.func,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default BlogForm
