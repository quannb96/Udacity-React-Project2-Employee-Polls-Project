import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Login from "../pages/Login";
import authReducer from "../reducers/authedSlice";
import pollReducer from "../reducers/pollSlice";
import userReducer from "../reducers/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    poll: pollReducer,
    user: userReducer,
  },
});

test("Login component matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("Login component changes state after typing in username field", () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  const usernameInput = screen.getByTestId("user-input");
  const passwordInput = screen.getByTestId("password-input");
  const loginButton = screen.getByTestId("login-button");

  fireEvent.change(usernameInput, { target: { value: "newUsername" } });

  expect(usernameInput.value).toBe("newUsername");

  fireEvent.change(passwordInput, { target: { value: "newPassword" } });

  expect(passwordInput.value).toBe("newPassword");

  fireEvent.click(loginButton);
});
