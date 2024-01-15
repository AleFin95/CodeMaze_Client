import React from "react";
import { AuthProvider } from "../../contexts/index";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  screen,
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import { BrowserRouter, MemoryRouter } from "react-router-dom";

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import HomePage from ".";

describe("HomePage Component", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("Contains 2 buttons", () => {
    /*const button1 = document.querySelector('.button1')
        expect(button1.innerHTML).toBeTruthy()
        const button2 = document.querySelector('.button2')
        expect(button2.innerHTML).toBeTruthy()*/
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeLessThan(3);
  });

  it("Contains a button with text 1 Vs 1 and background color #7df59b ", () => {
    const button = screen.getByTestId("button1");
    expect(button).toHaveStyle("backgroundColor: #7df59b");
    expect(button.textContent).toBe("1 Vs 1");
  });

  it("Contains a button with text Solo mode and background color #7df59b", () => {
    const button = screen.getByTestId("button2");
    expect(button).toHaveStyle("backgroundColor: #7df59b");
    expect(button.textContent).toBe("Solo mode");
  });

  it("User is forwarded to games page once button with text 1 Vs 1 is clicked", async () => {
    const link = screen.getByRole("link"); // Use screen here
    // Simulate a click on the link
    fireEvent.click(link);
    // Wait for navigation to occur
    await waitFor(() => {
      // Check the window location after navigation
      expect(window.location.pathname).toBe("/game");
    });
  });

  it("User is forwarded to games page once button with text Solo mode is clicked", async () => {
    const button2 = screen.getByTestId("button2");
    fireEvent.click(button2);
    await waitFor(() => {
      expect(window.location.pathname).toBe("/game");
    });
  });

  it("Contains a list", () => {
    const p = screen.getByRole("list");
    expect(p).toBeInTheDocument();
  });

  it("display list with two childs", () => {
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.childNodes.length).toBe(2);
  });

  it("Display first list with Play with your friends! text", () => {
    const p = screen.getByTestId("list1");
    expect(p.textContent).toBe(" Play with your friends! ");
  });

  it("Display second list with Multiple programming languages to choose from! text", () => {
    const p = screen.getByTestId("list2");
    expect(p.textContent).toBe(
      " Multiple programming languages to choose from!"
    );
  });

  it("h1 displays Start your coding journey now!", () => {
    /*const p = screen.getByText('Start your coding journey ow!');
      expect(p).toBeInTheDocument();*/
    const display = screen.getByRole("heading", { level: 1 });
    expect(display.textContent).toBe("Start your coding journey now!");
  });

  it("only displays 1 header ", () => {
    const h2s = screen.queryAllByRole("heading");
    expect(h2s.length).not.toBeGreaterThan(1);
  });

  it("top section has Lemon, serif font family", () => {
    const section = screen.getByTestId("top");
    expect(section).toHaveStyle("fontFamily: 'Lemon', serif");
  });

  it("Contains 2 icons with animation", () => {
    const icon1 = screen.getByTestId("icon1");
    const icon2 = screen.getByTestId("icon2");

    expect(icon1).toHaveStyle("animation: arrowBounce 2s infinite");
    expect(icon2).toHaveStyle("animation: arrowBounce 2s infinite");

    expect(icon1).toBeTruthy();
    expect(icon2).toBeTruthy();
  });

  afterEach(() => {
    cleanup();
  });
});
