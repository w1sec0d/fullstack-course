import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    let newAnecdote = {
      content: content.properties.value,
      author: author.properties.value,
      info: info.properties.value
    }
    e.preventDefault()
    props.addNew(newAnecdote)
    navigate("/")
    props.setNotification(`A new anecdote ${content} created!`)
    setTimeout(() => {
      props.setNotification(``)
    }, 5000);
  }

  const resetForm = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.properties}/>
        </div>
        <div>
          author
          <input {...author.properties}/>
        </div>
        <div>
          url for more info
          <input {...info.properties} />
        </div>
        <button>create</button>
        <button onClick={resetForm}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew