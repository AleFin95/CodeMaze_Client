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

import AvatarModal from ".";
import ProfilePage from "../../pages/ProfilePage";

describe("AvatarModal", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <ProfilePage>
            <AvatarModal />
          </ProfilePage>
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("renders the edit avatar button and triggers the modal on click", async () => {
    // Find the "Edit Avatar" button
    const editAvatarButton = screen.getByText("Edit Avatar");
    expect(editAvatarButton).toBeInTheDocument();

    // Trigger a click event on the button
    fireEvent.click(editAvatarButton);

    // Wait for the modal to be present using waitFor with a callback function
    await waitFor(() => {
      const avatarModal = screen.queryByAltText("Avatar 1"); // Use queryByAltText to find the element by alt attribute
      expect(avatarModal).toBeInTheDocument();
    });
  });

  it("renders the username", () => {
    const heading = screen.getByRole("heading", { name: /Username:/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the achievements section with XP, wins, and losses", () => {
    const achievementsHeading = screen.getByText("Achievements");
    expect(achievementsHeading).toBeInTheDocument();

    const xpElement = screen.getByText("XP: 0");
    const winsElement = screen.getByText("Wins: 0");
    const lossesElement = screen.getByText("Losses: 0");

    expect(xpElement).toBeInTheDocument();
    expect(winsElement).toBeInTheDocument();
    expect(lossesElement).toBeInTheDocument();
  });

  it("renders the sessions section with a message", () => {
    const sessionsHeading = screen.getByText("Sessions played");
    expect(sessionsHeading).toBeInTheDocument();

    const sessionsMessage = screen.getByText(
      "Your gaming chair feels neglected. No epic gaming tales to share—yet!"
    );

    expect(sessionsMessage).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
