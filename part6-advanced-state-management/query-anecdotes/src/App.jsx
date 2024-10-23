import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchAnecdotes, newVote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()
  
  const voteMutation = useMutation({
    mutationFn: newVote,
    onSuccess: (updatedAnecdote)=> {
      let anecdotes = queryClient.getQueryData(["anecdotes"])
      anecdotes = anecdotes.filter(anecdote => anecdote.id != updatedAnecdote.id)
      queryClient.setQueryData(["anecdotes"],anecdotes.concat(updatedAnecdote))
    }
  })

  const {isPending, error, data} = useQuery({
    queryKey: ["anecdotes"],
    queryFn: fetchAnecdotes,
    retry:1
  })

  if(isPending){
    return <div>Loading...</div>
  }

  if(error){
    console.log(error);
    
    return <div>An error ocurred retrieving the notes! Error Type: {error.message}</div>
  }
  

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)    
    dispatchNotification({payload:`You Voted for ${anecdote.content}!`, type:"SET_NOTIFICATION"})
    setTimeout(()=> dispatchNotification({type:"REMOVE_NOTIFICATION"}),5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
