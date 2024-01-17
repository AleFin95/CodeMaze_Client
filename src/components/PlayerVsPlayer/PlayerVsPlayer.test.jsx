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

  it.skip("renders player names", () => {
    const player = screen.getByRole("heading", { name: /ss/i });
    expect(player).toBeInTheDocument();
  });

  it.skip("renders title", () => {
    const heading = screen.getByRole("heading", {
      name: /Starting in/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Contains a p element with animation',() => {
    const p = screen.getByTestId('counter')
    expect(p).toBeInTheDocument();
    //expect(p).toHaveStyle("animation: animation: flipInX");
  }
  )

  it('Contains 2 images',() => {
    const image = screen.getByRole('img')
    expect(image.length).toBe(2)
  }
  )
  it('Contains 3 headers',() => {
    const h1s = screen.getByRole(heading)
    expect(h1s.length).toBeLessThanOrEqual(3);
  }
  )



  afterEach(() => {
    cleanup();
  });
});
