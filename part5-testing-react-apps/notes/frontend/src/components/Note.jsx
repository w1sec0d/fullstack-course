const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className="note">
      <li>{note.content}</li>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
