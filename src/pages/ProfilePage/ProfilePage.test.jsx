import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  screen,
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import ProfilePage from ".";

describe("ProfilePage", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <ProfilePage />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("renders edit avatar button", () => {
    const editAvatarButton = screen.getByText("Edit Avatar");
    expect(editAvatarButton).toBeInTheDocument();
  });

  it("triggers avatar selection modal on edit avatar button click", async () => {
    const editAvatarButton = screen.getByText("Edit Avatar");
    fireEvent.click(editAvatarButton);

    // Use waitFor with a longer timeout if needed
    await waitFor(() => {
      // Use getElementsByClassName to find the modal by its class
      const avatarModals = document.getElementsByClassName("avatar-modal");

      // Assert that at least one modal with the specified class is present
      expect(avatarModals.length).toBeGreaterThan(0);

      // If 'open' is a class added when the modal is visible, you can check for it
      const firstAvatarModal = avatarModals[0];
      expect(firstAvatarModal).toHaveClass("open");
    });
  });

  it("displays user information", () => {
    const usernameElement = screen.getByText("Username:");
    expect(usernameElement).toBeInTheDocument();
  });

  it("displays achievements section with XP, wins, and losses", () => {
    const xpElement = screen.getByText(/XP:/);
    const winsElement = screen.getByText(/Wins:/);
    const lossesElement = screen.getByText(/Losses:/);

    expect(xpElement).toBeInTheDocument();
    expect(winsElement).toBeInTheDocument();
    expect(lossesElement).toBeInTheDocument();
  });

  it("displays sessions section with appropriate message", () => {
    const sessionsElement = screen.getByText("Sessions played");
    const noSessionsMessage = screen.getByText(
      "Your gaming chair feels neglected. No epic gaming tales to share—yet!"
    );

    expect(sessionsElement).toBeInTheDocument();
    expect(noSessionsMessage).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
