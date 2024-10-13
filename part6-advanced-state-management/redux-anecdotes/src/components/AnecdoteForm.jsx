import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const note = event.target.note.value
    dispatch(createAnecdote(note))
    event.target.note.value = ""
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNote}>
          <div><input name="note"/></div>
          <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm