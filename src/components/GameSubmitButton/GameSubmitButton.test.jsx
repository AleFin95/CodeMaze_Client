import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import GameSubmitButton from ".";

describe("GameSubmitButton", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <GameSubmitButton />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("should find the Submit button", () => {
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
