// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

// 🐨 create your CountContext 
const CountContext = React.createContext([0, () => {}])

// 🐨 create a CountProvider component 
function CountProvider(props) {

  const [state, setState] = React.useState(0)

  const value = [state, setState]

  return <CountContext.Provider value={value} {...props} />
}

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  const [state, ] = useCount()

  return <div>{`The current count is ${state}`}</div>
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext
  const [, setState] = useCount()

  const increment = () => setState(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

const useCount = () => {

  const context = React.useContext(CountContext)

  if (!context) throw new Error("useCount must be used within the CountProvider")

  return context
}

function App() {
  return (
    <div>
      <CountProvider>
        {/*
          🐨 wrap these two components in the CountProvider so they can access
          the CountContext value
        */}

        <CountDisplay />
        <Counter />
        
      </CountProvider>
    </div>
  )
}

export default App
