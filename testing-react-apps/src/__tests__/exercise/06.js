import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

// Jest mock of module
// jest.mock('react-use-geolocation')

// set window.navigator.geolocation to an object that has a getCurrentPosition mock function
beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn()
  }
})

// it allows you to create a promise that you can resolve/reject on demand.
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

// Wont work without commenting out jest mock
test('displays the users current location', async () => {

  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 23
    }
  }

  const {promise, resolve} = deferred();
  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    callback => {
      promise.then(() => callback(fakePosition))
    }
  )

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  // Here we call the Mock API
  await act(async () => {
    resolve()
    await promise;
  })

  screen.debug()
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
  expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
  expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
})


// Wont work without 1st part jest mock
test('displays the users current location +1', async () => {

  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 23
    }
  }

  let setReturnValue
  function useMockCurrentPosition() {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  // Here we call the Mock API
  await act(async () => {
    setReturnValue([fakePosition]);
  })

  screen.debug()
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
  expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
  expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
})
