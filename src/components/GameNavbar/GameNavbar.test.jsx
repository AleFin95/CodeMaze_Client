import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import GameNavBar from ".";

describe("GameNavbar", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <GameNavBar />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("displays the game navbar with the correct text", () => {
    const heading = screen.getByRole("heading", { name: /Code Compiler/i });
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
