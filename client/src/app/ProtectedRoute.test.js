import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('../context/AuthContext', () => ({ useAuth: jest.fn() }));

import ProtectedRoute from './ProtectedRoute';

describe('ProtectedRoute', () => {

  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ replace: mockReplace });
  });

  it('renders children when the user is logged in', () => {
    useAuth.mockReturnValue({ isLoggedIn: true });
    render(<ProtectedRoute><p>Protected content</p></ProtectedRoute>);
    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  it('renders nothing when the user is not logged in', () => {
    useAuth.mockReturnValue({ isLoggedIn: false });
    const { container } = render(<ProtectedRoute><p>Protected content</p></ProtectedRoute>);
    expect(container.firstChild).toBeNull();
  });

  it('redirects to /login when the user is not logged in', () => {
    useAuth.mockReturnValue({ isLoggedIn: false });
    render(<ProtectedRoute><p>Protected content</p></ProtectedRoute>);
    expect(mockReplace).toHaveBeenCalledWith('/login');
  });

  it('does not redirect when the user is logged in', () => {
    useAuth.mockReturnValue({ isLoggedIn: true });
    render(<ProtectedRoute><p>Protected content</p></ProtectedRoute>);
    expect(mockReplace).not.toHaveBeenCalled();
  });

});
