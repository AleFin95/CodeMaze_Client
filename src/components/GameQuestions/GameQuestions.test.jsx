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

  it("renders the question heading", () => {
    const heading = screen.getByRole("heading", { name: /Question:/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders a readonly textarea with the correct ID", () => {
    const textarea = screen.getByRole("textbox", {
      readonly: true,
      id: "code-inp",
    });
    expect(textarea).toBeInTheDocument();
  });

  it("checks the content of the textarea", () => {
    const textarea = screen.getByRole("textbox", {
      readonly: true,
      id: "code-inp",
    });
    expect(textarea).toHaveValue("");
  });

  it("verifies the accessibility of the heading", () => {
    const heading = screen.getByRole("heading", { name: /Question:/i });
    expect(heading).toHaveAccessibleName(/Question:/i);
  });

  it("verifies that the textarea is readonly", () => {
    const textarea = screen.getByRole("textbox", {
      readonly: true,
      id: "code-inp",
    });
    expect(textarea).toHaveAttribute("readonly");
  });

  afterEach(() => {
    cleanup();
  });
});
