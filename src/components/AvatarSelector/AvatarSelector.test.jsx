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
import ProfilePage from "../../pages/ProfilePage";
import AvatarSelector from ".";

describe("AvatarSelector", () => {
  const avatars = [
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Pepper&amp;radius=45&amp;backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Midnight&amp;radius=45&amp;backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Mittens&amp;radius=45&amp;backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Max&amp;radius=45&amp;backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Oscar&amp;radius=45&amp;backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Sassy&amp;radius=45&amp;backgroundType=solid,gradientLinear",
  ];

  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <ProfilePage>
            <AvatarSelector avatars={avatars} />
          </ProfilePage>
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("renders all avatar images", () => {
    const avatarImages = screen.getAllByAltText(/Avatar \d/i);
    expect(avatarImages).toHaveLength(6);
    avatarImages.forEach((image) => {
      expect(image).toBeInTheDocument();
    });
  });

  it("renders avatars with correct alt text", () => {
    avatars.forEach((avatar, index) => {
      const imgElement = document.querySelector(
        `img[alt="Avatar ${index + 1}"]`
      );
      expect(imgElement).toBeTruthy();
    });
  });

  it("invokes onSelectAvatar when an avatar is clicked", () => {
    avatars.forEach((avatar, index) => {
      const imgElement = screen.getByAltText(`Avatar ${index + 1}`);
      fireEvent.click(imgElement);
      const selectedImgElement = screen.getByAltText(`Avatar ${index + 1}`);
      expect(selectedImgElement).toHaveClass("selected");
    });
  });

  it("renders the edit avatar button and triggers the modal on click", async () => {
    // Find the "Edit Avatar" button
    const editAvatarButton = screen.getByText("Edit Avatar");
    expect(editAvatarButton).toBeInTheDocument();
    fireEvent.click(editAvatarButton);

    await waitFor(() => {
      const modalCollection = document.getElementsByClassName("avatar-modal");
      expect(modalCollection.length).toBeGreaterThan(0);

      // If there's at least one element, check its classes
      if (modalCollection.length > 0) {
        const modal = modalCollection[0];
        expect(modal.classList.contains("avatar-modal")).toBe(true);
      }
    });
  });

  afterEach(() => {
    cleanup();
  });
});
