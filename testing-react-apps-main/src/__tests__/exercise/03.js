import * as React from 'react'
import {render, screen} from '@testing-library/react'
import Counter from '../../components/counter'
import userEvent from "@testing-library/user-event"

test('counter increments and decrements when the buttons are clicked', async () => {
  // userEvent is another method that allows us to overcome implementation biases
  const user = userEvent.setup()
  render(<Counter />)

  // This method allows us to avoid issues with implementation details
  // Regex makes it case insensitive
  const increment = screen.getByRole("button", { name: /increment/i });
  const decrement = screen.getByRole("button", { name: /decrement/i });
  const message = screen.getByText(/current count/i);

  // Click is actually a range of hover over, mouse down, mouse up, hover out
  expect(message).toHaveTextContent('Current count: 0')
  await user.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  await user.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
