import '@testing-library/jest-dom/matchers'; 
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import SignUpComponent from '.';

describe('SignUpComponent', () => {
  beforeEach(() => {
    render(<SignUpComponent />);
  });

  it('Displays the registration form', () => {
    const usernameInput = screen.getByPlaceholderText('username');
    const passwordInput = screen.getByPlaceholderText('password');
    const emailInput = screen.getByPlaceholderText('email')
    
    const registerButton = screen.getAllByRole('button');
    const loginButton=screen.getByRole('button', { name: /Log in/i })
    
  

    expect(usernameInput).to.exist;
    expect(passwordInput).to.exist;
    expect(emailInput).to.exist;
    expect(loginButton).to.exist;    
    expect(registerButton[0]).to.exist;//Registration button
    
  });
  it("Displays the heading with 'Sign Up'", () => {
    const headingElement = screen.getByRole('heading');

    expect(headingElement).to.exist;
    expect(headingElement.textContent).toBe('Sign Up');
  });



  afterEach(() => {
    cleanup();
  });
});
