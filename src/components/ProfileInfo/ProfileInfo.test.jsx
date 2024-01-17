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
          <ProfileInfo xp={0} wins={0} losses={0} sessions={[]} />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("should find the heading in the profile info", () => {
    const heading = screen.getByRole("heading", { name: /Match History/i });
    expect(heading).toBeInTheDocument();
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
