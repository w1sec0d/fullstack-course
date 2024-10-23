import { useMutation,  useQueryClient} from "@tanstack/react-query"
import { newAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: newAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
    },
    onError: () =>{  
      dispatchNotification({type:"SET_NOTIFICATION", payload:`Too short anecdote, must be 5 characters or more`})
      setTimeout(()=> dispatchNotification({type:"REMOVE_NOTIFICATION"}),5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes:0})
    dispatchNotification({type:"SET_NOTIFICATION", payload:`You created the anecdote ${content}`})
    setTimeout(()=> dispatchNotification({type:"REMOVE_NOTIFICATION"}),5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
