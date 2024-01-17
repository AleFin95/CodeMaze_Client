import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";

import GameTestCases from ".";
import GamePage from "../../pages/GamePage";

describe("GameTestCases", () => {
  let server;
  let socket;

  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <GamePage>
            <GameTestCases code={() => print(candy([1, 0, 2]))} />
          </GamePage>
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it.skip("should find the heading", () => {
    const heading = screen.getByRole("heading", { name: /Test Cases:/i });
    expect(heading).toBeInTheDocument();
  });

  it.skip("displays a link", () => {
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
