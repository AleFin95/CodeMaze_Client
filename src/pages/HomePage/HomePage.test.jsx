import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, fireEvent, waitFor, getByTestId} from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import HomePage from '.';

describe('HomePage Component',() => {
    render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    )
    it('Contains 2 buttons', () => {
        const label1 = document.querySelector('.button1')
        expect(label1.innerHTML).toBeTruthy()
        const label2 = document.querySelector('.button2')
        expect(label2.innerHTML).toBeTruthy()
    })
   
    it('User is forwarded to games page once button with text 1 Vs 1 is clicked'), () => {}
        const button1 = screen.getByText('1 Vs 1')
        fireEvent.click(button1);
         waitFor(() => {
          expect(window.location.pathname).toBe('/game');
    })

    it('User is forwarded to games page once button with text Solo mode is clicked'), () => {}
      const button2 = screen.getByText('Solo mode')
      fireEvent.click(button2);
      waitFor(() => {
      expect(window.location.pathname).toBe('/game');
    })

    it('Contains a list'), () => {
      const p = screen.getByRole('list');
      expect(p).toBeInTheDocument();
    }

    it('h2 displays Start your coding journey now!'), () => {
      const p = screen.getByText('Start your coding journey now!');
      expect(p).toBeInTheDocument();
    }

    it('display list with two childs' ), () => {
      const list =  screen.getByRole('list')
      expect(list).toBeInTheDocument();
      
      expect(list.cHildNodes.length).toBe(1)
      /*expect(message.childNodes[0].textContent).toBe("")*/
    }
    
    it('only displays 2 headings', () => {
      const h1s = screen.queryAllByRole('heading' ,{
        level: 2
      })

    expect(h1s.length).not.toBeGreaterThan(1)
    })
    
 

  
}
)

afterEach(() => {
    cleanup()
  })