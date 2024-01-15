import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import GamePage from "../../pages/GamePage";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import GameTestCases from ".";

describe("GameTestCases", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <GamePage>
            <GameTestCases />
          </GamePage>
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("should find the heading", () => {
    const heading = screen.getByRole("heading", { name: /Test Cases:/i });
    expect(heading).toBeInTheDocument();
  });

  /* it("should find the heading", () => {
    const heading = screen.getByRole("heading", { name: /Test Cases:/i });
    expect(heading).toBeInTheDocument();
  });

  it("should find the test cases", () => {
    const testCaseRegex = /print\(twoSum\(\[2, 7, 11, 15\], 9\)\)/i;
    const testCase = screen.getByText(testCaseRegex);
    expect(testCase).toBeInTheDocument();
  }); 
  
  it("should find the heading", () => {
    const heading = screen.getByRole("heading", {
      name: /Login to Access Game/i,
    });
    expect(heading).toBeInTheDocument();
  });
  
  */

  afterEach(() => {
    cleanup();
  });
});
