import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import FeedbackPopUp from ".";

describe("ProfileInfo", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <FeedbackPopUp buttonPressed={false} />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it('renders "You LOOSE" when buttonPressed is false', () => {
    const loseMessages = screen.getAllByText("You LOOSE");

    expect(loseMessages.length).toBeGreaterThan(0);

    loseMessages.forEach((element) => {
      expect(element).toHaveTextContent("You LOOSE");
    });
  });

  afterEach(() => {
    cleanup();
  });
});
