
import { useState } from 'react'
import './App.css'

function Student(props) {
  return <h2>Student Name: {props.name}</h2>
}

function App() {
  const [show, setShow] = useState(true)

  return (
    <div>
      <h1>Component Architecture</h1>
      <h2>Working with State and Props in React JS</h2>

      <Student name="Sirin Fathima" />

      <button onClick={() => setShow(!show)}>
        Show / Hide
      </button>

      {show && <p>Welcome to React JS!</p>}
    </div>
  )
}

export default App
