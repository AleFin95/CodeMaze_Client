import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  screen,
  render,
  cleanup,
  fireEvent,
  waitFor,
  getByTestId,
} from "@testing-library/react";

import { BrowserRouter, MemoryRouter } from "react-router-dom";
import myImage from "../../assets/gif.gif";

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import MatchingPlayers from ".";
import { AuthProvider } from "../../contexts";

describe("MatchingPlayers Component", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <MatchingPlayers />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("Contains one header with Matching with another player text and 30px fontSize", () => {
    const h1s = screen.queryAllByRole("heading");
    expect(h1s.length).not.toBeGreaterThan(1);

    const h1 = screen.getByRole("heading");
    expect(h1.textContent).toBe("Matching you with another player...");

    expect(h1).toHaveStyle("fontSize: 30px");
  });

  it("Contains a gif image with 353px of width and 300px of height", () => {
    const div = screen.getByTestId("div");

    expect(div).toHaveStyle(`backgroundImage: url(${myImage})`);
    expect(div).toHaveStyle("height: 300px");
    expect(div).toHaveStyle("width: 353px");
  });

  it("Contains a section with marginTop of 15 em and items align to center", () => {
    const section = screen.getByTestId("section1");

    expect(section).toHaveStyle("marginTop: 15em");
    expect(section).toHaveStyle("alignItems: center");
  });

  it("Contains a link with Cancel text", () => {
    const button = screen.getByTestId("button");

    expect(button.textContent).toBe("Cancel");
    expect(button).toBeInTheDocument();
  });

  it.skip("User is forwarded to Home page when Cancel link is clicked", async () => {
    const button = screen.getByTestId("button");
    fireEvent.click(button);

    // Wait for any asynchronous behavior, if applicable
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  afterEach(() => {
    cleanup();
  });
});
