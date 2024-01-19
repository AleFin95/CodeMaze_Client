import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import GameOutput from ".";

describe("GameOutput", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <GameOutput />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("should find the Clear button in the output", () => {
    const clearButton = screen.getByRole("button", { name: /Clear/i });
    expect(clearButton).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
