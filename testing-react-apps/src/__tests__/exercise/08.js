import * as React from 'react'
import {render, screen, act, renderHook} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function UseCounterHookExample() {
  const {count, increment, decrement} = useCounter();

  return (
    <div>
      <span>Current Count: {count}</span>
      <button onClick={increment}>plus</button>
      <button onClick={decrement}>minus</button>
    </div>
  )
}

function setup({initialProps} = {}) {
  const result = {};
  function TestComponent() {
    result.current = useCounter(initialProps)
    return null;
  }
  render(<TestComponent />)
  return result;
}


test('exposes the count and increment/decrement functions', async () => {
  const user = userEvent.setup();
  render(<UseCounterHookExample />);
  
  const countMessage = screen.getByText(/current count/i);
  const increment = screen.getByRole("button", {name: /plus/i})
  const decrement = screen.getByRole("button", {name: /minus/i})
  
  expect(countMessage).toHaveTextContent(/current count: 0/i)

  await user.click(increment);
  await user.click(increment);
  await user.click(increment);
  expect(countMessage).toHaveTextContent(/current count: 3/i)

  await user.click(decrement);
  await user.click(decrement);
  expect(countMessage).toHaveTextContent(/current count: 1/i)
})


test('exposes the count and increment/decrement functions for complicated components', async () => {

  const result = setup();

  expect(result.current.count).toBe(0);

  act(() => {result.current.increment()})
  expect(result.current.count).toBe(1);

  act(() => {
    result.current.decrement();
    result.current.decrement();
  })
  expect(result.current.count).toBe(-1);
})


test('test initial count state', async () => {

  const result = setup({initialProps: {initialCount: 3}});

  expect(result.current.count).toBe(3);

  act(() => {result.current.increment()})
  expect(result.current.count).toBe(4);

  act(() => {
    result.current.decrement();
    result.current.decrement();
  })
  expect(result.current.count).toBe(2);
})


test('test step', async () => {

  const result = setup({initialProps: {initialCount: 3, step: 2}});

  expect(result.current.count).toBe(3);

  act(() => {result.current.increment()})
  expect(result.current.count).toBe(5);

  act(() => {
    result.current.decrement();
    result.current.decrement();
  })
  expect(result.current.count).toBe(1);
})

// With hook library
test('test step with hook lib, new props', async () => {

  const {result, rerender} = renderHook(useCounter, {initialProps: {initialCount: 3, step: 2}})
  expect(result.current.count).toBe(3);

  act(() => {result.current.increment()})
  expect(result.current.count).toBe(5);

  // Now step for component is 5
  rerender({step: 5})

  act(() => {
    result.current.decrement();
    result.current.decrement();
  })
  expect(result.current.count).toBe(-5);
})