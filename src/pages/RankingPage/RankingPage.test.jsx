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

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import RankingPage from ".";

describe("HomePage Component", () => {
  render(
    <MemoryRouter>
      <RankingPage />
    </MemoryRouter>
  );

  it("h1 displays Leaderboard"),
    () => {
      const p = screen.getByText("Leaderboard");
      expect(p).toBeInTheDocument();
    };
});

afterEach(() => {
  cleanup();
});
