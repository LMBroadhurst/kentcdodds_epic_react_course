// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {

  const [value, setValue] = React.useState("")
  const [error, setError] = React.useState(null)

  // Not best option for now but still very useful
  const usernameInputRef = React.useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    // Probably best choice
    const usernameValue = event.target.elements.usernameInput.value

    // With Refs...
    const usernameValueRefs = usernameInputRef.current.value
    alert(usernameValue, usernameValueRefs)
  }

  const handleChange = (event) => {
    const {value} = event.target
    setValue(value.toLowerCase())

    // No longer needed
    const isLowerCase = value === value.toLowerCase()
    setError(isLowerCase ? null : "Username must be lower case")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='usernameInput'>Username:</label>
        <input ref={usernameInputRef} type="text" id='usernameInput' value={value} onChange={handleChange}/>
      </div>
      <div style={{color: "red"}}>{error}</div>
      <button type="submit" disabled={Boolean(error)}>Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
