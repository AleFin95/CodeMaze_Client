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

  it("User is forwarded to Ranking page when Ranking link is clicked", async () => {
    const link1 = screen.getByText("Ranking");
    expect(link1).toBeInTheDocument();
    fireEvent.click(link1);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/ranking");
    });
  });

  it("renders the Match History section", () => {
    const matchHeading = screen.getByText("Match History");
    expect(matchHeading).toBeInTheDocument();
  });

  it("should show wins and losses", () => {
    const winsRegex = /Wins:\s*(\d+)/;
    const lossesRegex = /Losses:\s*(\d+)/;

    const winsCount = screen.getByText(winsRegex);
    const lossesCount = screen.getByText(lossesRegex);

    expect(winsCount).toBeInTheDocument();
    expect(lossesCount).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
