import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  spy,
  mount,
} from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/index";
import { BrowserRouter } from "react-router-dom";

import GamePage from ".";

import { MemoryRouter } from "react-router-dom";

describe("GamePage", () => {
  beforeEach(() => {
    // Spy on useEffect
    const useEffectSpy = spy();
    global.mockEffect = useEffectSpy;
  });

  afterEach(() => {
    // Clean up after each test
    cleanup();
    global.mockEffect = undefined;
  });

  it("renders without crashing", async () => {
    // Mocking dependencies and context
    jest.mock("axios", () => ({
      post: jest.fn(() =>
        Promise.resolve({ data: { output: "Mocked Output" } })
      ),
    }));

    // Mocking localStorage
    const localStorageMock = {
      getItem: jest.fn(),
    };
    global.localStorage = localStorageMock;

    // Mount the component with context values
    const wrapper = mount(
      <MemoryRouter initialEntries={["/game"]}>
        <GamePage />
      </MemoryRouter>,
      {
        global: {
          mocks: {
            useAuth: () => ({ socket: { emit: jest.fn(), on: jest.fn() } }),
          },
        },
      }
    );

    // Wait for any asynchronous tasks (e.g., useEffect) to complete
    await wrapper.vm.$nextTick();

    // Assertions
    expect(wrapper.find(".App").exists()).toBe(true);
    expect(global.mockEffect.called).toBe(true);
    // Add more assertions based on your component's behavior
  });

  // Add more test cases as needed
});
