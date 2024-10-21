import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { fetchAnecdotes } from './requests'

const App = () => {
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
    console.log('vote')
  }

  const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]

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
