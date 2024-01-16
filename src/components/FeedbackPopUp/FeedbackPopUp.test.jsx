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
          <FeedbackPopUp />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("should find the Feedback Pop up window in feedback", () => {
    const xp = screen.getByText(/Feedback Pop up window/i);
    expect(xp).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
