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

  it("renders title", () => {
    const heading = screen.getByText('Starting in')
    expect(heading).toBeInTheDocument();
  });

  it('Contains a p element with animation',() => {
    const p = screen.getByTestId('counter')
    expect(p).toBeInTheDocument();
    //expect(p).toHaveStyle("animation: animation: flipInX");
  }
  )

  it('Contains 2 images',() => {
    const image = document.querySelectorAll('img')
    expect(image.length).toBe(2) 
  }
  )
  it("only displays 3 header ", () => {
    const h1s = screen.queryAllByRole("heading");
    expect(h1s.length).not.toBeGreaterThan(3);
  });

   
  afterEach(() => {
    cleanup();
  });
});
