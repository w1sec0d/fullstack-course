import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notificationRemove, notificationSet } from "../reducers/notificationRecucer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(createAnecdote(anecdote))
    event.target.anecdote.value = ""
    dispatch(notificationSet(`You created the anecdote '${anecdote}' :)`))
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