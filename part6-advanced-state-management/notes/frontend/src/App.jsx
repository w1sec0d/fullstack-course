const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const App = () => {

  const createNote = (content) => {
    return {
      type: 'NEW_NOTE',
      payload: {
        content,
        important: false,
        id: generateId()
      }
    }
  }

    const toggleImportanceOf = (id) => {
      return {
        type: 'TOGGLE_IMPORTANCE',
        payload: { id }
      }
    }

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    store.dispatch(createNote(content))
  }


  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id))
  }

  return (
    <div>

      <form onSubmit={addNote}>
        <input name="note" /> 
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map(note =>
          <li
            key={note.id} 

            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}