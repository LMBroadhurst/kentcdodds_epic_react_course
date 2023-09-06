import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  // 🐨 create a ref here with React.useRef()
  const elementToTilt = React.useRef()

  // 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your div look fancy.
  React.useEffect(() => {
    // We need to wait for the element to render before we can access it from the document
    const tiltNode = elementToTilt.current
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })

    return function cleanup() {
      tiltNode.VanillaTilt.destroy()
    }
  }, [])

  // 🐨 add the `ref` prop to the `tilt-root` div here:
  return (
    <div className="tilt-root" ref={elementToTilt}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
