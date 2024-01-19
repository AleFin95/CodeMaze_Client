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

  it("it renders  CODEMAZE and Join us", () => {
    expect(screen.getByText("CODEMAZE")).toBeInTheDocument();
    expect(screen.getByText("Join us")).toBeInTheDocument();
  });

  it("User is forwarded to CODEMAZE page when Home link is clicked", async () => {
    const link1 = screen.getByText("CODEMAZE");
    expect(link1).toBeInTheDocument();
    fireEvent.click(link1);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  it("User is forwarded to Login page when Join us link is clicked", async () => {
    const link1 = screen.getByText("Join us");
    expect(link1).toBeInTheDocument();
    fireEvent.click(link1);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/login");
    });
  });

  /*it("User is forwarded to Profile page when Avatar is clicked", async () => {
    const link1 = screen.getByRole("img");
    expect(link1).toBeInTheDocument();
    fireEvent.click(link1);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/profile");
    });
  }); */

  afterEach(() => {
    cleanup();
  });
});
