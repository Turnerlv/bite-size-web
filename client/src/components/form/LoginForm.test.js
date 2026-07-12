import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/context/NotificationContext';
import { useParamLogout } from '@/hooks/paramLogout';
import { authAPI } from '@/api/auth';
import { cookies } from 'next/headers';

// ─── Mock next/navigation (required for any component using useRouter/usePathname) ───
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    refresh: jest.fn(),
    pathname: '/',
  })),
  usePathname: jest.fn(() => '/'),
  useParams: jest.fn(() => ({})),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// ─── Mock next/link (optional, prevents Link anchor errors) ─────────────────────────
jest.mock('next/link', () => {
  const Link = ({ children, href }) => <a href={href}>{children}</a>;
  Link.displayName = 'Link';
  return Link;
});

// ─── Mock dependencies (AuthContext, NotificationContext, API) ───────────────────────
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  })),
}));

// ─── Mock custom hooks (if needed) ───────────────────────────────────────────────
jest.mock('../../context/AuthContext', () => ({ useAuth: jest.fn() }));
jest.mock('../../context/NotificationContext', () => ({ useNotification: jest.fn() }));
jest.mock('../../api/auth', () => ({
  authAPI: {
    server: {
      login: jest.fn(),
    }
}}));
jest.mock('../../hooks/paramLogout', () => ({ useParamLogout: jest.fn() }));

// ─── Import component under test ─────────────────────────────────────────────────────
import LoginForm from './LoginForm';

// ─── Test suite ──────────────────────────────────────────────────────────────────────
describe('LoginForm', () => {

const mockLogin = jest.fn();
const mockPush = jest.fn();
const mockShowToast = jest.fn();
const mockUseParamLogout = jest.fn();
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
    useParamLogout.mockImplementation(mockUseParamLogout);
    cookies.mockReturnValue(mockCookies);
  });

  it('renders without crashing', () => {
    render(<LoginForm />);
    expect(screen.getByRole('form', { name: /login form/i })).toBeInTheDocument();
  });

  it('calls showToast with success message after valid login', async () => {
    authAPI.server.login.mockResolvedValueOnce({ token: 'abc123', user: { id: 1 } });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'Password1!');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('Logged in successfully', null, 'success');
    });
  });

  it('displays required field errors when submitted empty', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('displays a validation error for an invalid email format', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('displays a server error message when login fails', async () => {
    authAPI.server.login.mockRejectedValueOnce(new Error('Invalid credentials'));

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'Password1!');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
    });
});