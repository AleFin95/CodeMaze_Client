import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import GameNavBar from ".";

describe("GameNavbar", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <GameNavBar />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("displays a link", () => {
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  it("should find the language select input in the navbar", () => {
    const languageSelectInput = screen.getByText("Language:");
    expect(languageSelectInput).toBeInTheDocument();
  });

  it("should find the theme select input in the navbar", () => {
    const themeSelectInput = screen.getByText(/Theme/i);
    expect(themeSelectInput).toBeInTheDocument();
  });

  it("should test font size range input in the navbar", () => {
    const fontSizeRangeLabel = screen.getByLabelText("Font Size:");
    const fontSizeRangeInput = screen.getByLabelText("Font Size:");

    expect(fontSizeRangeLabel).toBeInTheDocument();
    expect(fontSizeRangeInput).toBeInTheDocument();
  });

  it("should find the font size range input in the navbar", () => {
    const fontSizeRangeInput = screen.getByRole("slider", {
      name: /Font Size/i,
    });
    expect(fontSizeRangeInput).toBeInTheDocument();
  });

  it("should find the Leave Room button in the navbar", () => {
    const leaveRoomButton = screen.getByRole("button", { name: /Leave Room/i });
    expect(leaveRoomButton).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
