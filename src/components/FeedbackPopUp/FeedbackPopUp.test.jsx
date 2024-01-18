import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import FeedbackPopUp from ".";

describe("FeedbackPopUp", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <FeedbackPopUp buttonPressed={false} />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("renders correctly for lost game", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <FeedbackPopUp
            buttonPressed={false}
            correctAnswer={false}
            autoClose={false}
            onClose={() => {}}
            gameFinish={() => {}}
            handleCancel={() => {}}
          />
        </BrowserRouter>
      </AuthProvider>
    );

    const loseMessages = screen.getAllByText("Your opponents code didn't work");

    expect(loseMessages.length).toBeGreaterThan(0);
  });

  it("renders correctly for won game", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <FeedbackPopUp
            buttonPressed={true}
            correctAnswer={true}
            autoClose={false}
            onClose={() => {}}
            gameFinish={() => {}}
            handleCancel={() => {}}
          />
        </BrowserRouter>
      </AuthProvider>
    );

    // Check for elements related to a won game
    const winMessage = screen.getByText("You WON!!");
    const exitButton = screen.getByText("Exit Game");

    expect(winMessage).toBeInTheDocument();
    expect(exitButton).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
