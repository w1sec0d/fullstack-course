import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notificationRemove, notificationSet } from "../reducers/notificationRecucer"
import anecdoteService from "../services/anecdoteService"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = async(event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote);
    
    dispatch(createAnecdote(newAnecdote))
    event.target.anecdote.value = ""

    // Notification Trigger
    dispatch(notificationSet(`You created the anecdote '${newAnecdote.content}' :)`))
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