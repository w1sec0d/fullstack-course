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
      content: content.value,
      author: author.value,
      info: info.value
    }
    e.preventDefault()
    props.addNew(newAnecdote)
    navigate("/")
    props.setNotification(`A new anecdote ${content} created!`)
    setTimeout(() => {
      props.setNotification(``)
    }, 5000);
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content}/>
        </div>
        <div>
          author
          <input {...author}/>
        </div>
        <div>
          url for more info
          <input y{...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

export default CreateNew