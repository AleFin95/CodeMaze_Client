import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import GameRunButton from ".";

describe("GameRunButton", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <GameRunButton />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("should find the Run button", () => {
    const runButton = screen.getByRole("button", { name: /Run/i });
    expect(runButton).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
