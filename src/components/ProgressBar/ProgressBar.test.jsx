import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import ProgressBar from ".";

describe("ProgressBar", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <ProgressBar />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("renders the progress bar based on currentXP", () => {
    const currentXP = 50;
    const minXPBronze = 0;
    const maxXPBronze = 100;
    const minXPSilver = 101;
    const maxXPSilver = 200;
    const minXPGold = 201;
    const maxXPGold = 300;
    const minXPlatinum = 301;
    const maxXPlatinum = 400;

    const { container } = render(
      <ProgressBar
        currentXP={currentXP}
        minXPBronze={minXPBronze}
        maxXPBronze={maxXPBronze}
        minXPSilver={minXPSilver}
        maxXPSilver={maxXPSilver}
        minXPGold={minXPGold}
        maxXPGold={maxXPGold}
        minXPlatinum={minXPlatinum}
        maxXPlatinum={maxXPlatinum}
      />
    );

    // Ensure that the progress bar renders with the correct width
    const progressBar = container.querySelector(".mainbar");
    const expectedWidth = `${
      ((currentXP - minXPBronze) / (maxXPBronze - minXPBronze)) * 25
    }%`;
    expect(progressBar.style.width).toBe(expectedWidth);
  });

  it("renders the progress bar with 0% width when currentXP is below minXPBronze", () => {
    const currentXP = -10; // Below minXPBronze
    const minXPBronze = 0;
    const maxXPBronze = 100;

    const { container } = render(
      <ProgressBar
        currentXP={currentXP}
        minXPBronze={minXPBronze}
        maxXPBronze={maxXPBronze}
        minXPSilver={101}
        maxXPSilver={200}
        minXPGold={201}
        maxXPGold={300}
        minXPlatinum={301}
        maxXPlatinum={400}
      />
    );

    const progressBar = container.querySelector(".mainbar");
    expect(progressBar.style.width).toBe("0%");
  });

  it("renders the progress bar with 100% width when currentXP surpasses the highest rank", () => {
    const currentXP = 500; // Surpasses the highest rank
    const minXPBronze = 0;
    const maxXPBronze = 100;
    const minXPSilver = 101;
    const maxXPSilver = 200;
    const minXPGold = 201;
    const maxXPGold = 300;
    const minXPlatinum = 301;
    const maxXPlatinum = 400;

    const { container } = render(
      <ProgressBar
        currentXP={currentXP}
        minXPBronze={minXPBronze}
        maxXPBronze={maxXPBronze}
        minXPSilver={minXPSilver}
        maxXPSilver={maxXPSilver}
        minXPGold={minXPGold}
        maxXPGold={maxXPGold}
        minXPlatinum={minXPlatinum}
        maxXPlatinum={maxXPlatinum}
      />
    );

    const progressBar = container.querySelector(".mainbar");
    expect(progressBar.style.width).toBe("100%");
  });

  it("renders the progress bar with correct width between different rank thresholds", () => {
    const currentXP = 175; // Between maxXPBronze and minXPSilver
    const minXPBronze = 0;
    const maxXPBronze = 100;
    const minXPSilver = 101;
    const maxXPSilver = 200;

    const { container } = render(
      <ProgressBar
        currentXP={currentXP}
        minXPBronze={minXPBronze}
        maxXPBronze={maxXPBronze}
        minXPSilver={minXPSilver}
        maxXPSilver={maxXPSilver}
        minXPGold={201}
        maxXPGold={300}
        minXPlatinum={301}
        maxXPlatinum={400}
      />
    );

    const progressBar = container.querySelector(".mainbar");
    const expectedWidth = `${
      ((currentXP - minXPSilver) / (maxXPSilver - minXPSilver)) * 25 + 25
    }%`;

    // Compare the expected and received values
    expect(progressBar.style.width).toBe(expectedWidth);
  });

  afterEach(() => {
    cleanup();
  });
});
