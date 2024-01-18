import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import GamePage from "../../pages/GamePage";

import GameTestCases from ".";

describe("GameTestCases", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <GamePage>
            <GameTestCases code={() => print(candy([1, 0, 2]))} />
          </GamePage>
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("should find the heading", () => {
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  it("displays a link", () => {
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
