// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {setupServer} from 'msw/node'
import Login from '../../components/login-submission'
import {handlers} from 'test/server-handlers'
import {rest} from 'msw'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  // Sends the API request
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  // As we get the loading spinner, we can wait for that to stop rendering as the point
  // at which the API has returned a response
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // Expect to see username on the screen
  expect(screen.getByText(username)).toBeInTheDocument()
})

test('password is required ui error message functionality', async () => {
  render(<Login />)
  const {username} = buildLoginForm()

  // Fills in username field -- Sends the API request
  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  // Wait until API has returned an error
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // Check to see if error message pops up
  expect(screen.getByText(/password required/i)).toMatchInlineSnapshot(`
    <div
      role="alert"
      style="color: red;"
    >
      password required
    </div>
  `)
})

test('password is required ui error message functionality +1', async () => {
  render(<Login />)
  const {username} = buildLoginForm()

  // Fills in username field -- Sends the API request
  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  // Wait until API has returned an error
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // Check to see if error message pops up
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  )
})

test('unknown server error displays error message', async () => {
  const testErrorMessage = "Something real wrong sir";
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({message: testErrorMessage}),
        )
      },
    ),
  )

  render(<Login />)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  // Wait until API has returned an error
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // Check to see if error message pops up
  expect(screen.getByRole('alert')).toHaveTextContent(testErrorMessage);
})
