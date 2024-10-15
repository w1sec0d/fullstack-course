import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationRecucer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))    

    // Notification Trigger
    dispatch(setNotification(`You created the anecdote '${content}' :)`,5))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNote}>
          <div><input name="anecdote"/></div>
          <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm