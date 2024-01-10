import * as matchers from '@testing-library/jest-dom/matchers';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
//import { jest } from '@testing-library/jest-dom';
//require('@testing-library/jest-dom/extend-expect');
import { describe, expect, it } from 'vitest';
import Login from '.';
import { AuthProvider } from '../../contexts';

/*jest.mock('../../contexts', () => ({
  useAuth: jest.fn(() => ({ setToken: jest.fn() })),
}));*/

expect.extend(matchers);
describe('Login Component', () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );

  it('renders the login form correctly', async () => {
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText('No account?')).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText('Log in'));

    //await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('toggles SignUpComponent correctly', async () => {
    expect(screen.getByRole('heading', { level: 2 }).textContent).not.toEqual('Sign Up');
    fireEvent.click(screen.getByText('Sign up'));
    expect(screen.getByRole('heading', { level: 2 }).textContent).toEqual('Oops...');
  });


  it('renders video as a background', async () => {
    // Check if the Video component is rendered
    const videoElement = document.getElementById('video-background');
    expect(videoElement).toBeInTheDocument();
})
    
})

