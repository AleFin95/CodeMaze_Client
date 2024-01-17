import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import * as AuthContext from "../contexts"; // Import the actual module for useAuth

describe("ProtectedRoute", () => {
  const originalUseAuth = AuthContext.useAuth;

  afterEach(() => {
    AuthContext.useAuth = originalUseAuth;
  });

  it.skip("renders Navigate component when user is not authenticated", () => {
    // Mock useAuth to simulate an unauthenticated user
    AuthContext.useAuth.mockReturnValue({ accessToken: null });

    const { container } = render(
      <ProtectedRoute redirectTo="/login">
        <div data-testid="content">Protected Content</div>
      </ProtectedRoute>
    );

    // Assert that the component renders Navigate
    expect(container.innerHTML).toContain("Navigate");
  });

  it.skip("renders Outlet component when user is authenticated", () => {
    // Mock useAuth to simulate an authenticated user
    AuthContext.useAuth.mockImplementation(() => ({
      accessToken: "fakeAccessToken",
    }));

    // Render the ProtectedRoute component within a MemoryRouter
    render(
      <MemoryRouter>
        <routes redirectTo="/login">
          <Outlet />
        </routes>
      </MemoryRouter>
    );

    // Check if the component renders Outlet
    const outletComponent = screen.getByTestId("outlet");
    expect(outletComponent).toBeInTheDocument();
  });
});
