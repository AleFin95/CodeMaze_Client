import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";
import GameQuestions from "../../components/GameQuestions";
import io from "socket.io-client";

describe("GameQuestions", () => {
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
          <GameQuestions
            socket={socket}
            room="room"
            roomData="roomData"
            name="eco"
          />
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
