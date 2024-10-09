import { useDispatch } from "react-redux"
import { createNote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const note = event.target.note.value
    event.target.note.value = ""
    dispatch(createNote(note))
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