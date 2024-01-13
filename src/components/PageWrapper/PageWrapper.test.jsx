import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import userEvent from "@testing-library/user-event";


import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import PageWrapper from '.';
import { AuthProvider } from '../../contexts';

describe('Page Wrapper Component',() => {
    render(
    <AuthProvider>
        <BrowserRouter>
            <PageWrapper />
        </BrowserRouter>
    </AuthProvider> 
    )
    it('displays a PageWrapper with 4 children', () => {
        const nav = screen.getByTestId('div')

        expect(nav).toBeInTheDocument()
        expect(nav.childNodes.length).toBe(4)
    })
    /*
    it('User is forwarded to Home page when Home link is clicked', async() => {
        const link1 = screen.getByRole('link', {name: 'Ranking' ,hidden: 'true'})
        fireEvent.click(link1);
      
        // Wait for any asynchronous behavior, if applicable
        await waitFor(() => {
          expect(window.location.pathname).toBe('/ranking');
        });
    })
    /*
    it( 'dsds', async() => {
         const rankingLink = screen.getByText((content, element) => {
        // Check if the text "Ranking" is present in any of the descendant elements
        const hasText = element.textContent.includes('Ranking');
        return hasText;
      });
    
      // Simulate a click on the link
      fireEvent.click(rankingLink);
    
      // Wait for any asynchronous behavior, if applicable
      await waitFor(() => {
        // Assert that the URL is as expected after the click
        expect(window.location.pathname).toBe('/ranking');
    })
   
})*/


afterEach(() => {
    cleanup()
  })})