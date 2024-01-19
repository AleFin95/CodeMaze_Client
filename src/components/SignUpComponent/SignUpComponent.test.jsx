import "@testing-library/jest-dom/matchers";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import SignUpComponent from ".";

describe("SignUpComponent", () => {
  beforeEach(() => {
    render(<SignUpComponent handleSignUpClick={() => {}} />);
  });

  it("Displays the registration form", () => {
    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const registerButton = screen.getByRole("button", { name: /Register/i });
    const loginButton = screen.getByRole("button", { name: /Log in/i });

    expect(usernameInput).to.exist;
    expect(passwordInput).to.exist;
    expect(registerButton).to.exist;
    expect(loginButton).to.exist;
  });

  it("Displays the heading with 'Register Here !'", () => {
    const headingElement = screen.getByRole("heading", { level: 2 });

    expect(headingElement).to.exist;
    expect(headingElement.textContent).toBe("Register Here!");
  });

  it("Submits the form correctly", async () => {
    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const registerButton = screen.getByRole("button", { name: /Register/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(registerButton);
  });

  afterEach(() => {
    cleanup();
  });
});
