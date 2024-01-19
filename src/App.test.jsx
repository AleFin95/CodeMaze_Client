import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/index";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import App from "./App";

describe("App Component", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );
  });

  it("renders navigation links", () => {
    const homeLink = screen.getByRole("link", { name: "CODEMAZE" });
    expect(homeLink).toBeInTheDocument();
  });

  it("renders navigation", () => {
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });

  it("renders list items with correct text", () => {
    const list1 = screen.getByTestId("list1");
    const list2 = screen.getByTestId("list2");
    expect(list1).toHaveTextContent("Play with your friends!");
    expect(list2).toHaveTextContent(
      "Multiple programming languages to choose from!"
    );
  });

  it("renders video element with correct attributes", () => {
    const videoElement = screen.getByText(
      "Your browser does not support the video tag."
    );
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute("autoplay");
    expect(videoElement).toHaveAttribute("loop");
  });

  it("renders links with correct href attributes", () => {
    const homeLink = screen.getByRole("link", { name: "CODEMAZE" });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders icons with correct styling", () => {
    const icon1 = screen.getByTestId("icon1");
    const icon2 = screen.getByTestId("icon2");
    expect(icon1).toHaveStyle({ fontSize: "40px", color: "rgb(75, 242, 117)" });
    expect(icon2).toHaveStyle({ fontSize: "40px", color: "rgb(75, 242, 117)" });
  });

  it("render test list", () => {
    const ulElement = screen.getByRole("list");
    const list1Element = screen.getByTestId("list1");
    const list2Element = screen.getByTestId("list2");
    expect(ulElement).toBeInTheDocument();
    expect(list1Element).toBeInTheDocument();
    expect(list2Element).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
