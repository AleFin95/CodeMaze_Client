import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, fireEvent, waitFor, getByTestId} from '@testing-library/react';

import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import HomePage from '.';

describe('HomePage Component',() => {
  beforeEach(() => {
    render(
        <MemoryRouter><HomePage /> </MemoryRouter>
           
    )
    });
    
afterEach(() => {
  cleanup()
});
  
    it('Contains 2 buttons', () => {
        /*const label1 = document.querySelector('.button1')
        expect(label1.innerHTML).toBeTruthy()
        const label2 = document.querySelector('.button2')
        expect(label2.innerHTML).toBeTruthy()*/
    })
   
    it('User is forwarded to games page once button with text 1 Vs 1 is clicked', async() => {
        const button1 = screen.getByText('1 Vs 1')
        fireEvent.click(button1);
         waitFor(() => {
          expect(window.location.pathname).toBe('/game');
    })
    })

    it('User is forwarded to games page once button with text Solo mode is clicked', async() => {
      const button2 = screen.getByText('Solo mode')
      fireEvent.click(button2);
      waitFor(() => {
      expect(window.location.pathname).toBe('/game');
    })
  })

    it('Contains a list', () => {
      const p = screen.getByRole('list');
      expect(p).toBeInTheDocument();
    })

    it('display list with two childs' , () => {
      const list = screen.getByRole('list')
      expect(list).toBeInTheDocument();
      expect(list.childNodes.length).toBe(2)
      /*expect(message.childNodes[0].textContent).toBe("")*/
    })

    it('h2 displays Start your coding journey now!', () => {
      /*const p = screen.getByText('Start your coding journey ow!');
      expect(p).toBeInTheDocument();*/
      const display = screen.getByRole('heading', { level: 1})
      expect(display.textContent).toBe('Start your coding journey now!')
    })

    it('only displays 2 headers ', () => {
      const h2s = screen.queryAllByRole('heading')
      expect(h2s.length).toBeLessThan(3)
    })

    it('top section has Lemon, serif font family', () => {
      const section = screen.getByTestId('top')
      expect(section).toHaveStyle("fontFamily: 'Lemon', serif");
    })

});