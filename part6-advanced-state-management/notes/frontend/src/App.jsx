import React from "react"
import NewNote from "./components/NewNote"
import Notes from "./components/Notes"
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  const filterSelected = (value) => {
    console.log(value)
  }
  return (
    <div>
      <NewNote />
      <VisibilityFilter/>
      <Notes />
    </div>
  )
}

export default App