import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';


import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import  HomePage  from '.';
import { BrowserRouter } from 'react-router-dom';

describe('Home Component', () => {
  beforeEach(() => {
    render(
    <BrowserRouter>
        <HomePage />
    </BrowserRouter>
   )
  })

  afterEach(() => {
    cleanup()
  })

  it('has a h1 displaying Level up your game', () => {
    const display = document.querySelector('h1')
    expect(display.innerHTML).toContain('Level Up your coding game')
  }) 
    
  })
