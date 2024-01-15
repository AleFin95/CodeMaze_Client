import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import GameQuestions from ".";

describe("GameQuestions", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <GameQuestions />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("should find the heading", () => {
    const heading = screen.getByRole("heading", { name: /Question:/i });
    expect(heading).toBeInTheDocument();
  });

  it("should find the question text", () => {
    const questionTextRegex =
      /Given an array of integers nums and an integer target/i;
    const question = screen.getByText(questionTextRegex);
    expect(question).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
