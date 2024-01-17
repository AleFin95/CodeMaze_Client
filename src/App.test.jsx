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
    const rankingLink = screen.getByRole("link", { name: "Ranking" });
    const loginLink = screen.getByRole("link", { name: "Login/Register" });
    expect(rankingLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });

  it("renders buttons with correct text", () => {
    const button1 = screen.getByTestId("button1");
    const button2 = screen.getByTestId("button2");
    expect(button1).toHaveTextContent("1 Vs 1");
    expect(button2).toHaveTextContent("Solo mode");
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
    const rankingLink = screen.getByRole("link", { name: "Ranking" });
    const loginLink = screen.getByRole("link", { name: "Login/Register" });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(rankingLink).toHaveAttribute("href", "/ranking");
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("renders icons with correct styling", () => {
    const icon1 = screen.getByTestId("icon1");
    const icon2 = screen.getByTestId("icon2");
    expect(icon1).toHaveStyle({ fontSize: "40px", color: "rgb(75, 242, 117)" });
    expect(icon2).toHaveStyle({ fontSize: "40px", color: "rgb(75, 242, 117)" });
  });

  it("clicking on the 1 Vs 1 button navigates to /game", () => {
    const buttons = document.getElementsByClassName("button1");
    expect(buttons.length).toBeGreaterThan(0);

    fireEvent.click(buttons[0]);

    const link = document.getElementById("link1");
    expect(link).toHaveAttribute("href", "/game");
  });

  afterEach(() => {
    cleanup();
  });
});
