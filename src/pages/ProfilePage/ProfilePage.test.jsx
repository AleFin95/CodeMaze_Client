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

  it("should show wins and losses", () => {
    const winsRegex = /Wins:\s*(\d+)/;
    const lossesRegex = /Losses:\s*(\d+)/;

    const winsCount = screen.getByText(winsRegex);
    const lossesCount = screen.getByText(lossesRegex);

    expect(winsCount).toBeInTheDocument();
    expect(lossesCount).toBeInTheDocument();
  });

  it("displays Match History", () => {
    const sessionsElement = screen.getByText("Match History");
    expect(sessionsElement).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
