import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  screen,
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import GamePage from ".";

describe("GamePage", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <GamePage />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("renders GamePage component", async () => {
    const headingElement = screen.getByRole("heading", {
      name: /Login to Access Game/i,
    });
    const loginButton = screen.getByRole("button", { name: /Login/i });

    expect(headingElement).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
