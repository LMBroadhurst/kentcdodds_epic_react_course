import * as React from 'react'
import { render, fireEvent } from "@testing-library/react";
import Counter from '../../components/counter'

global.IS_REACT_ACT_ENVIRONMENT = true

test('counter increments and decrements when the buttons are clicked', () => {

  const { container } = render(<Counter />)
  const [decrement, increment] = container.querySelectorAll('button')

  expect(container).toHaveTextContent('Current count: 0')

  fireEvent.click(increment);
  expect(container).toHaveTextContent('Current count: 1')

  fireEvent.click(decrement);
  expect(container).toHaveTextContent('Current count: 0')
})
