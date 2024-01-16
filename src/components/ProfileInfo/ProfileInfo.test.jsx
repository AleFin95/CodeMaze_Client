import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import ProfileInfo from ".";

describe("ProfileInfo", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <ProfileInfo />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("should find the heading in the profile info", () => {
    const heading = screen.getByRole("heading", { name: /Achievements/i });
    expect(heading).toBeInTheDocument();
  });

  it("should find the 2nd heading in the profile info", () => {
    const heading = screen.getByRole("heading", { name: /Sessions played/i });
    expect(heading).toBeInTheDocument();
  });

  it("should find the XP in the profile info", () => {
    const xp = screen.getByText(/XP:/i);
    expect(xp).toBeInTheDocument();
  });

  it("should find the Wins in the profile info", () => {
    const win = screen.getByText(/Wins:/i);
    expect(win).toBeInTheDocument();
  });

  it("should find the Losses in the profile info", () => {
    const loss = screen.getByText(/Losses:/i);
    expect(loss).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
