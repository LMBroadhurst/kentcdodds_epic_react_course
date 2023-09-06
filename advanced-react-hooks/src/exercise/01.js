import * as React from 'react'

// Reducers accepts two arguments, the current state and the action you are trying to perform
const countReducer = (state, action) => {
  const step = action.payload.step;
  switch (action.type) {
    case "INCREMENT_COUNT":
      return {...state, count: state.count + step};

    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

function Counter({initialCount = 0, step = 3}) {

  // Think about useState and useReducer like this...
  // dispatch... "updates the state to a different value and triggers a re-render" -- "has no return value"
  const [state, dispatch] = React.useReducer(countReducer, {count: initialCount});

  const {count} = state;

  // Q: Why don't we send state in the dispatch? 
  // Can get swifty with the payload now... Cracked the code a little here :D
  const increment = () => dispatch({type: "INCREMENT_COUNT", payload: {step: step}});

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
