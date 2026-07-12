import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/admin/profile'),
}));
jest.mock('next/link', () => {
  const Link = ({ children, href, className }) => <a href={href} className={className}>{children}</a>;
  Link.displayName = 'Link';
  return Link;
});
jest.mock('../../../context/AuthContext', () => ({ useAuth: jest.fn() }));

import DashboardLayout from './layout';

describe('DashboardLayout', () => {

  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockPush });
  });

  it('renders the welcome heading with the user first name', () => {
    useAuth.mockReturnValue({ user: { name: 'Jane Doe' }, isAdmin: false });
    render(<DashboardLayout><div>content</div></DashboardLayout>);
    expect(screen.getByText('Welcome, Jane')).toBeInTheDocument();
  });

  it('renders "Admin" when user has no name', () => {
    useAuth.mockReturnValue({ user: null, isAdmin: false });
    render(<DashboardLayout><div>content</div></DashboardLayout>);
    expect(screen.getByText('Welcome, Admin')).toBeInTheDocument();
  });

  it('renders the Briefs and Profile tabs for regular users', () => {
    useAuth.mockReturnValue({ user: { name: 'Jane' }, isAdmin: false });
    render(<DashboardLayout><div>content</div></DashboardLayout>);
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /briefs/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /users/i })).not.toBeInTheDocument();
  });

  it('renders the Users tab for admin users', () => {
    useAuth.mockReturnValue({ user: { name: 'Admin User' }, isAdmin: true });
    render(<DashboardLayout><div>content</div></DashboardLayout>);
    expect(screen.getByRole('link', { name: /users/i })).toBeInTheDocument();
  });

  it('navigates to /admin/briefs/new when Add brief is clicked', async () => {
    const user = userEvent.setup();
    useAuth.mockReturnValue({ user: { name: 'Jane' }, isAdmin: false });
    render(<DashboardLayout><div>content</div></DashboardLayout>);
    await user.click(screen.getByRole('button', { name: /add brief/i }));
    expect(mockPush).toHaveBeenCalledWith('/admin/briefs/new');
  });

  it('renders children', () => {
    useAuth.mockReturnValue({ user: { name: 'Jane' }, isAdmin: false });
    render(<DashboardLayout><p>Page content here</p></DashboardLayout>);
    expect(screen.getByText('Page content here')).toBeInTheDocument();
  });

});
