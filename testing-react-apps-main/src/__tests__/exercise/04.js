import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  const user = userEvent.setup()

  let submittedData;
  const handleSubmit = (data) => (submittedData = data)
  render(<Login onSubmit={handleSubmit} />)

  const username = "Just my name";
  const password = "No password";

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });
  
  await user.type(usernameInput, username)
  await user.type(passwordInput, password)
  await user.click(submitButton)

  expect(submittedData).toEqual({ username, password })
})
