import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import PlayerVsPlayer from ".";

describe("PlayerVsPlayer", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <PlayerVsPlayer />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("renders player names", () => {
    const player = screen.getByRole("heading", { name: /ss/i });
    expect(player).toBeInTheDocument();
  });

  it("renders title", () => {
    const heading = screen.getByRole("heading", {
      name: /The game will start in:\s*10/i,
    });
    expect(heading).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
