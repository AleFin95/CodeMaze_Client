import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import VideoVs from ".";

describe("Video Component", () => {
  beforeEach(() => {
    render(<VideoVs />);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders video component with expected attributes", () => {
    const videoElement = document.getElementById("video-vs-background");

    // Assuming you have a fallback text when the browser doesn't support the video tag
    const fallbackText = document.querySelector("video > p");

    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute("autoPlay");
    expect(videoElement).toHaveAttribute("loop");
    /*expect(videoElement).toHaveAttribute("muted");*/

    const sourceElement = screen.getByText(
      "Your browser does not support the video tag."
    );
    expect(sourceElement).toBeInTheDocument();
  });
});
