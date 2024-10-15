import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notificationRemove, notificationSet } from "../reducers/notificationRecucer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))    

    // Notification Trigger
    dispatch(notificationSet(`You created the anecdote '${content}' :)`))
    setTimeout(()=>dispatch(notificationRemove()), 5000)
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