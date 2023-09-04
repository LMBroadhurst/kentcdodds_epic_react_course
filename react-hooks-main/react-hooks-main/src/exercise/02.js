// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, initialName, {serialize = JSON.stringify, deserialize = JSON.parse} = {}) {

  const initialNameState = () => {
    const localStorageVal = window.localStorage.getItem(key)

    if (localStorageVal) {
      return deserialize(localStorageVal)
    }

    return initialName
  }

  const [state, setState] = React.useState(initialNameState)

  React.useEffect(() => {
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}) {

  const [name, setName] = useLocalStorageState("name", initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
