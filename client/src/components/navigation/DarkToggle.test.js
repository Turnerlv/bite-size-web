import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/link', () => {
  const Link = ({ children, href }) => <a href={href}>{children}</a>;
  Link.displayName = 'Link';
  return Link;
});

// ─── Mock window.matchMedia (not in JSDOM) ────────────────────────────────────
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

import DarkToggle from './DarkToggle';

describe('DarkToggle', () => {

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    // Restore default matchMedia implementation (clearAllMocks doesn't reset mockImplementation)
    window.matchMedia.mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  it('renders a button after mount', async () => {
    await act(async () => { render(<DarkToggle />); });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('defaults to light theme when no stored preference and matchMedia returns false', async () => {
    await act(async () => { render(<DarkToggle />); });
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('defaults to dark theme when matchMedia prefers dark', async () => {
    window.matchMedia.mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    await act(async () => { render(<DarkToggle />); });
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('toggles theme from light to dark on click and saves to localStorage', async () => {
    const user = userEvent.setup();
    await act(async () => { render(<DarkToggle />); });
    await user.click(screen.getByRole('button'));
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('toggles theme from dark to light on click', async () => {
    localStorage.setItem('theme', 'dark');
    const user = userEvent.setup();
    await act(async () => { render(<DarkToggle />); });
    await user.click(screen.getByRole('button'));
    expect(localStorage.getItem('theme')).toBe('light');
  });

});
