import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import io from "socket.io-client";

import GameTestCases from ".";
import GamePage from "../../pages/GamePage";

describe("GameTestCases", () => {
  let server;
  let socket;

  beforeEach(() => {
    // Create a mock server and client socket
    server = io();
    socket = io(server);

    // Use the client socket in your component (replace with actual logic)
    render(
      <AuthProvider>
        <BrowserRouter>
          <GamePage>
            <GameTestCases
              socket={socket}
              room="room"
              roomData="roomData"
              name="eco"
            />
          </GamePage>
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("should find the heading", () => {
    const heading = screen.getByRole("heading", { name: /Question:/i });
    expect(heading).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
    server.close();
  });
});
