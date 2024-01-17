import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/index";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import App from "./App";

describe("Main", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );
  });

  it("renders App component with navigation links", () => {
    const homeLink = screen.getByText("CODEMAZE");
    expect(homeLink).toBeInTheDocument();

    const rankingLink = screen.getByText("Ranking");
    expect(rankingLink).toBeInTheDocument();

    const logLink = screen.getByText("Login/Register");
    expect(logLink).toBeInTheDocument();
  });

  it("navigates to 1 Vs 1 page when clicking ", () => {
    const link = screen.getByText("1 Vs 1");
    fireEvent.click(link);

    const aboutPage = screen.getByText("Start your coding journey now!");
    expect(aboutPage).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
