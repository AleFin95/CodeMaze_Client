import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import AvatarSelector from ".";

describe("AvatarSelector", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <AvatarSelector />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  const avatars = [
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Pepper&amp;radius=45&amp;backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Midnight&amp;radius=45&amp;backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Mittens&amp;radius=45&amp;backgroundType=solid,gradientLinear",
  ];

  it("renders avatars and allows selection", () => {
    const onSelectAvatar = vi.spy();

    avatars.forEach((avatar, index) => {
      const avatarImage = screen.getByAltText(`Avatar ${index + 1}`);
      expect(avatarImage).toBeInTheDocument();
    });

    const avatarToSelect = avatars[0];
    const selectedAvatarImage = screen.getByAltText("Avatar 1");

    fireEvent.click(selectedAvatarImage);

    expect(onSelectAvatar.calls.length).toBe(1); // Check if onSelectAvatar was called once
    expect(onSelectAvatar.calls[0].arguments[0]).toBe(avatarToSelect); // Check if onSelectAvatar was called with the correct avatar
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks(); // Restore all mocks after each test
  });
});
