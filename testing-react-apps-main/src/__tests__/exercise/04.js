import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import { build, fake } from "@jackfranklin/test-data-bot"

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  }
})

// Generate random userName and password
// function buildLoginForm(overrides) {
//   return {
//     username: faker.internet.userName(),
//     password: faker.internet.password(),
//     // overrides allows for additional properties or property overrides
//     ...overrides
//   }
// }

test('submitting the form calls onSubmit with username and password', async () => {
  const user = userEvent.setup()

  // let submittedData;
  // const handleSubmit = (data) => (submittedData = data)
  // Instead of mocking a function & creating submittedData...
  const handleSubmit = jest.fn();
  render(<Login onSubmit={handleSubmit} />)
  const { username, password } = buildLoginForm();

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });
  
  await user.type(usernameInput, username)
  await user.type(passwordInput, password)
  await user.click(submitButton)

  expect(handleSubmit).toBeCalledWith({ username, password });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
})
