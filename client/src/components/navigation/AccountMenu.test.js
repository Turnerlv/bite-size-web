import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// ─── Mock useClickOutside as a no-op ─────────────────────────────────────────
jest.mock('../../hooks/a11y/useClickOutside', () => ({
  useClickOutside: jest.fn(),
}));

import AccountMenu from './AccountMenu';

describe('AccountMenu', () => {

  const mockPush = jest.fn();
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockPush });
  });

  it('renders the trigger button with the user first name', () => {
    render(<AccountMenu name="Jane Doe" logout={mockLogout} />);
    const trigger = screen.getByRole('button', { name: /account menu toggle/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Welcome, Jane');
  });

  it('opens the dropdown menu when the trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<AccountMenu name="Jane Doe" logout={mockLogout} />);
    await user.click(screen.getByRole('button', { name: /account menu toggle/i }));
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('My briefs')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('closes the dropdown after an item is selected', async () => {
    const user = userEvent.setup();
    render(<AccountMenu name="Jane Doe" logout={mockLogout} />);
    await user.click(screen.getByRole('button', { name: /account menu toggle/i }));
    await user.click(screen.getByText('Profile'));
    expect(screen.queryByText('My briefs')).not.toBeInTheDocument();
  });

  it('navigates to /admin/profile when Profile is clicked', async () => {
    const user = userEvent.setup();
    render(<AccountMenu name="Jane Doe" logout={mockLogout} />);
    await user.click(screen.getByRole('button', { name: /account menu toggle/i }));
    await user.click(screen.getByText('Profile'));
    expect(mockPush).toHaveBeenCalledWith('/admin/profile');
  });

  it('calls logout when Logout is clicked', async () => {
    const user = userEvent.setup();
    render(<AccountMenu name="Jane Doe" logout={mockLogout} />);
    await user.click(screen.getByRole('button', { name: /account menu toggle/i }));
    await user.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('renders mobile layout with Profile and Logout buttons when isMobile is true', () => {
    render(<AccountMenu name="Jane Doe" logout={mockLogout} isMobile />);
    expect(screen.getByRole('button', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

});
