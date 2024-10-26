import { Link } from "react-router-dom"

export const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <Link key={anecdote.id} to={'/anecdotes/' + anecdote.id}><li>{anecdote.content}</li></Link>)}
    </ul>
  </div>
)

const Anecdote = ({value}) => (
  <div>
    <h3>{value.content} by {value.author}</h3>
    <p>has {value.votes} votes</p>
    <p>for more info see <a href={value.info} target='_BLANK' rel="noreferrer">{value.info}</a></p>
  </div>
)

export default Anecdote