import * as React from 'react'
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

global.IS_REACT_ACT_ENVIRONMENT = true

beforeEach(() => {
  // Cleans up DOM before each test to ensure there are no unwanted side effects
  document.body.innerHTML = "";
})

test('counter increments and decrements when the buttons are clicked', () => {
  
  // To begin, a basic DOM is created that contains the Counter component.
  // This is then rendered and tested to see if it contains the state we expect it to.
  const div = document.createElement("div");
  document.body.append(div);

  const root = createRoot(div);

  // Act is used to change the state on the DOM.
  act(() => {
    root.render(<Counter />)
  });

  // Using the MouseEvent follows a users experience a little closer [0 = left button click]
  const clickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    button: 0,
  });
 
  // Testing state uploads correctly, should always be 0
  // Testing buttons
  const msg = div.firstChild.querySelector("div");
  expect(msg.textContent).toBe("Current count: 0");

  const [decrementButton, incrementButton] = div.querySelectorAll("button");

  act(() => {
    incrementButton.dispatchEvent(clickEvent);
  });
  expect(msg.textContent).toBe("Current count: 1");

  act(() => {
    decrementButton.dispatchEvent(clickEvent);
    decrementButton.dispatchEvent(clickEvent);
  });
  expect(msg.textContent).toBe("Current count: -1");
});

/* eslint no-unused-vars:0 */
