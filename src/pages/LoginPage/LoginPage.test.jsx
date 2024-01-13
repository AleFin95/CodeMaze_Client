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
    expect(screen.getByRole('heading')).toHaveTextContent('CODEMAZE');
    expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText('No account?')).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    fireEvent.change(screen.getByPlaceholderText('username'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password123' },
    });
  
    fireEvent.click(screen.getByText('Log in'));
  

  });

  it('toggles SignUpComponent correctly', async () => {
    expect(screen.getByText('Sign up')).toBeInTheDocument();  
    fireEvent.click(screen.getByText('Sign up'));

  });


  it('renders video as a background', async () => {
    const videoElement = document.getElementById('video-background');
    expect(videoElement).toBeInTheDocument();
})
    
})

