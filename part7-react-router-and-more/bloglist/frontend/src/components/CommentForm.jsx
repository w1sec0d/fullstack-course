import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotification } from '../state/notificationSlice'

const CommentForm = () => {
  const [comment, setComment] = useState('')
  const blogId = useParams().id
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const commentMutation = useMutation({
    mutationFn: (comment) => blogService.createComment({ comment, blogId }),
    mutationKey: ['blog'],
    onSuccess: () => {
      queryClient.invalidateQueries(['blog', blogId])

      dispatch(
        setNotification({
          title: 'Commented succesfully!',
          timer: 1000,
        })
      )
      setComment('')
    },

    onError: () => {
      dispatch(
        setNotification({
          title: 'Something went wrong',
          text: 'Please try again later',
          icon: 'error',
          timer: 5000,
        })
      )
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    commentMutation.mutate(comment)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="cool article!"
          required={true}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          className="text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button className="ml-2 bg-accent2 text-black px-2 py-1 rounded hover:pointer">
          Add Comment
        </button>
      </div>
    </form>
  )
}

export default CommentForm
