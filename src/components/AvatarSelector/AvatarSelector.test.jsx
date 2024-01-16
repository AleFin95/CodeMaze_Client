import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import ProfilePage from "../../pages/ProfilePage";
import AvatarSelector from ".";

describe("AvatarSelector", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <ProfilePage>
            <AvatarSelector />
          </ProfilePage>
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("should find the heading in the navbar", () => {
    const heading = screen.getByRole("heading", { name: /Code Compiler/i });
    expect(heading).toBeInTheDocument();
  });

  it("displays a link", () => {
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });
  afterEach(() => {
    cleanup();
  });
});
