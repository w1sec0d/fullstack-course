import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import blogService from '../../services/blogs'
import { useDispatch } from 'react-redux'
import { setConfirmation, setNotification } from '../../state/notificationSlice'
import { useEffect, useState } from 'react'
import ConfirmationDialog from '../ConfirmationDialog'
import ToastNotification from '../ToastNotification'
import CommentForm from '../CommentForm'
import { setUser } from '../../state/userSlice'

const BlogPage = () => {
  const [confirmationCallback, setConfirmationCallback] = useState(null)

  const id = useParams().id
  const { data, isLoading, isError } = useQuery({
    queryKey: ['blog'],
    queryFn: () => blogService.getBlog({ blogId: id }),
  })
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = window.localStorage.getItem('bloglistAppUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const likeMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      queryClient.invalidateQueries('blog')
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
      navigate('/')
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

  const handleLike = () => {
    const putRequestObject = {
      user: data.user.id,
      likes: data.likes + 1,
      author: data.author,
      title: data.title,
      url: data.url,
    }

    likeMutation.mutate({ id: data.id, blog: putRequestObject })
  }

  const handleRemove = () => {
    const onConfirm = () => {
      removeMutation.mutate(data.id)
    }

    setConfirmationCallback(() => onConfirm)

    dispatch(
      setConfirmation({
        title: `Are you sure ?`,
        text: `Do you want to delete ${data.title} blog?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      })
    )
  }

  if (isLoading) {
    return <p>Loading Blog info...</p>
  }
  if (isError) {
    return <p>An error ocurred! try again later</p>
  }

  if (data) {
    return (
      <div>
        <h2>{data.title}</h2>
        <a href={data.url} target="_BLANK" rel="noopener noreferrer">
          {data.url}
        </a>
        <p>{data.likes} likes</p>
        <p>Added by {data.author}</p>
        <button onClick={handleLike}>Like</button>
        <button onClick={handleRemove}>Remove</button>
        <h2>Comments</h2>
        <CommentForm />
        <ul>
          {data.comments.length >= 1 ? (
            data.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </ul>
        <ConfirmationDialog onConfirm={confirmationCallback} />
        <ToastNotification />
      </div>
    )
  }
}

export default BlogPage
