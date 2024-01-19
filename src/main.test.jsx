import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  screen,
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
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
  });

  it("renders video element", () => {
    const videoElement = document.getElementById("video-background");
    expect(videoElement).toBeInTheDocument();
  });

  it("renders heading in top section", () => {
    const headingElement = screen.getByText("Start your coding journey now!");
    expect(headingElement).toBeInTheDocument();
  });

  it("renders top section", () => {
    const videoElement = document.getElementById("top");
    expect(videoElement).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
