import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/link', () => {
  const Link = ({ children, href }) => <a href={href}>{children}</a>;
  Link.displayName = 'Link';
  return Link;
});

import Search from './Search';

const HISTORY_KEY = 'search-history';

describe('Search', () => {

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders the search input', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('updates the input value as the user types', async () => {
    const user = userEvent.setup();
    render(<Search />);
    await user.type(screen.getByPlaceholderText(/search/i), 'React');
    expect(screen.getByPlaceholderText(/search/i)).toHaveValue('React');
  });

  it('calls onSearch with the query on form submit', async () => {
    const handleSearch = jest.fn();
    const user = userEvent.setup();
    render(<Search onSearch={handleSearch} />);
    await user.type(screen.getByPlaceholderText(/search/i), 'React');
    await user.keyboard('{Enter}');
    expect(handleSearch).toHaveBeenCalledWith('React');
  });

  it('saves the search query to localStorage on submit', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={jest.fn()} />);
    await user.type(screen.getByPlaceholderText(/search/i), 'JavaScript');
    await user.keyboard('{Enter}');
    const stored = JSON.parse(localStorage.getItem(HISTORY_KEY));
    expect(stored).toContain('JavaScript');
  });

  it('clears the input after a successful submit', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={jest.fn()} />);
    await user.type(screen.getByPlaceholderText(/search/i), 'React');
    await user.keyboard('{Enter}');
    expect(screen.getByPlaceholderText(/search/i)).toHaveValue('');
  });

  it('does not call onSearch when the query is empty', async () => {
    const handleSearch = jest.fn();
    const user = userEvent.setup();
    render(<Search onSearch={handleSearch} />);
    await user.keyboard('{Enter}');
    expect(handleSearch).not.toHaveBeenCalled();
  });

  it('shows search history suggestions on focus when history exists', async () => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(['TypeScript', 'React']));
    const user = userEvent.setup();
    render(<Search />);
    await user.click(screen.getByPlaceholderText(/search/i));
    await waitFor(() => {
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
    });
  });

});
