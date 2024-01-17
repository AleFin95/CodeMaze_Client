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
import userEvent from "@testing-library/user-event";

import { BrowserRouter, MemoryRouter } from "react-router-dom";

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import PageWrapper from ".";
import { AuthProvider } from "../../contexts";

describe("Page Wrapper Component", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <PageWrapper />
        </BrowserRouter>
      </AuthProvider>
    );
  });
  it("displays a nav with 2 children", () => {
    const nav = screen.getByTestId("div");

    expect(nav).toBeInTheDocument();
    expect(nav.childNodes.length).toBe(2);
  });

  it("it renders  CODEMAZE and Game links", () => {
    expect(screen.getByText("CODEMAZE")).toBeInTheDocument();
    expect(screen.getByText("Login/Register")).toBeInTheDocument();
  });

  /*it("User is forwarded to Home page when Home link is clicked", async () => {
    const link1 = screen.getByText("Home");
    expect(link1).toBeInTheDocument();
    fireEvent.click(link1);

    // Wait for any asynchronous behavior, if applicable
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  }); */

  /*it("User is forwarded to Ranking page when Ranking link is clicked", async () => {
    const link1 = screen.getByText("Ranking");
    expect(link1).toBeInTheDocument();
    fireEvent.click(link1);

    // Wait for any asynchronous behavior, if applicable
    await waitFor(() => {
      expect(window.location.pathname).toBe("/ranking");
    });
  });*/

  it("User is forwarded to Login page when Login link is clicked", async () => {
    const link1 = screen.getByText("Login/Register");
    expect(link1).toBeInTheDocument();
    fireEvent.click(link1);

    // Wait for any asynchronous behavior, if applicable
    await waitFor(() => {
      expect(window.location.pathname).toBe("/login");
    });
  });

  /*it("User is forwarded to Profile page when Avatar is clicked", async () => {
    const link1 = screen.getByRole("img");
    expect(link1).toBeInTheDocument();
    fireEvent.click(link1);

    // Wait for any asynchronous behavior, if applicable
    await waitFor(() => {
      expect(window.location.pathname).toBe("/profile");
    });
  }); */
  //check wether links have different color when not active

  /*it('Nav links color changes when link is clicked', () => {
    const loginLink = screen.getByText('Login/Register')
    fireEvent.click(loginLink);
  
    // Wait for any asynchronous behavior, if applicable
  
    expect(loginLink).toHaveStyle("color: #4bf275");
    
  })*/

  afterEach(() => {
    cleanup();
  });
});
