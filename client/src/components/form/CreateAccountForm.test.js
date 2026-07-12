import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/context/NotificationContext';
import { authAPI } from '@/api/auth';

// ─── Mock next/navigation ─────────────────────────────────────────────────────
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
  })),
  usePathname: jest.fn(() => '/'),
  useParams: jest.fn(() => ({})),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// ─── Mock next/link ───────────────────────────────────────────────────────────
jest.mock('next/link', () => {
  const Link = ({ children, href }) => <a href={href}>{children}</a>;
  Link.displayName = 'Link';
  return Link;
});

// ─── Mock next/headers ───────────────────────────────────────────────────────
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  })),
}));

// ─── Mock dependencies ────────────────────────────────────────────────────────
jest.mock('../../context/AuthContext', () => ({ useAuth: jest.fn() }));
jest.mock('../../context/NotificationContext', () => ({ useNotification: jest.fn() }));
jest.mock('../../api/auth', () => ({
  authAPI: {
    server: {
      createAccount: jest.fn(),
    },
  },
}));

// ─── Import component under test ──────────────────────────────────────────────
import CreateAccountForm from './CreateAccountForm';
import { cookies } from 'next/headers';

// ─── Test suite ───────────────────────────────────────────────────────────────
describe('CreateAccountForm', () => {

  const mockLogin = jest.fn();
  const mockPush = jest.fn();
  const mockShowToast = jest.fn();
  const mockCookies = {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    useAuth.mockReturnValue({ login: mockLogin });
    useRouter.mockReturnValue({ push: mockPush, refresh: jest.fn() });
    useNotification.mockReturnValue({ showToast: mockShowToast });
    cookies.mockReturnValue(mockCookies);
  });

  it('renders without crashing', () => {
    render(<CreateAccountForm />);
    expect(screen.getByRole('form', { name: /create account form/i })).toBeInTheDocument();
  });

  it('calls showToast with success message after valid account creation', async () => {
    authAPI.server.createAccount.mockResolvedValueOnce({ token: 'abc123', user: { id: 1 } });

    const user = userEvent.setup();
    render(<CreateAccountForm />);

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/password/i), 'Password1!');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('Account created successfully', null, 'success');
    });
  });

  it('displays required field errors when submitted empty', async () => {
    const user = userEvent.setup();
    render(<CreateAccountForm />);

    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
  });

  it('displays a validation error for an invalid email format', async () => {
    const user = userEvent.setup();
    render(<CreateAccountForm />);

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/password/i), 'Password1!');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('displays a validation error for a weak password', async () => {
    const user = userEvent.setup();
    render(<CreateAccountForm />);

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/password/i), 'weak');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
  });

  it('displays a server error message when account creation fails', async () => {
    authAPI.server.createAccount.mockRejectedValueOnce(new Error('Email already exists'));

    const user = userEvent.setup();
    render(<CreateAccountForm />);

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/password/i), 'Password1!');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
  });

});
