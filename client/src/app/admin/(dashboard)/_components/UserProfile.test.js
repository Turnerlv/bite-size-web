import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNotification } from '@/context/NotificationContext';
import { useRouter } from 'next/navigation';
import { changePasswordAction } from '@/lib/auth';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('../../../../context/NotificationContext', () => ({ useNotification: jest.fn() }));
jest.mock('../../../../lib/auth', () => ({
  changePasswordAction: jest.fn(),
}));

import UserProfile from './UserProfile';

const sampleUser = { name: 'Jane Doe', email: 'jane@example.com', title: 'Engineer', bio: '' };

describe('UserProfile', () => {

  const mockOnUpdateProfile = jest.fn();
  const mockShowToast = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ refresh: mockRefresh });
    useNotification.mockReturnValue({ showToast: mockShowToast });
  });

  it('renders the profile form with user data from props', () => {
    render(<UserProfile userData={sampleUser} onUpdateProfile={mockOnUpdateProfile} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('renders with empty form when no userData is provided', () => {
    render(<UserProfile onUpdateProfile={mockOnUpdateProfile} />);
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
  });

  it('renders the change password form', () => {
    render(<UserProfile userData={sampleUser} onUpdateProfile={mockOnUpdateProfile} />);
    expect(screen.getByLabelText(/current password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
  });

  it('calls onUpdateProfile and shows success toast on profile form submission', async () => {
    mockOnUpdateProfile.mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();
    render(<UserProfile userData={sampleUser} onUpdateProfile={mockOnUpdateProfile} />);

    await user.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(mockOnUpdateProfile).toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledWith('Profile updated successfully', null, 'success');
    });
  });

  it('shows error toast when onUpdateProfile fails', async () => {
    mockOnUpdateProfile.mockResolvedValueOnce({ error: 'Name is required' });
    const user = userEvent.setup();
    render(<UserProfile userData={sampleUser} onUpdateProfile={mockOnUpdateProfile} />);

    await user.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('Error', 'Name is required', 'error');
    });
  });

  it('shows success toast after password reset', async () => {
    changePasswordAction.mockResolvedValueOnce({ success: true, error: null });
    const user = userEvent.setup();
    render(<UserProfile userData={sampleUser} onUpdateProfile={mockOnUpdateProfile} />);

    await user.type(screen.getByLabelText(/current password/i), 'OldPass1!');
    await user.type(screen.getByLabelText(/new password/i), 'NewPass1!');
    await user.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(changePasswordAction).toHaveBeenCalledWith({
        current_password: 'OldPass1!',
        new_password: 'NewPass1!',
      });
      expect(mockShowToast).toHaveBeenCalledWith(
        'Password updated',
        'Your changes will take effect on next login.',
        'success'
      );
    });
  });

  it('shows error toast when password reset fails', async () => {
    changePasswordAction.mockResolvedValueOnce({ error: 'Current password is incorrect' });
    const user = userEvent.setup();
    render(<UserProfile userData={sampleUser} onUpdateProfile={mockOnUpdateProfile} />);

    await user.type(screen.getByLabelText(/current password/i), 'WrongPass1!');
    await user.type(screen.getByLabelText(/new password/i), 'NewPass1!');
    await user.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('Error', 'Current password is incorrect', 'error');
    });
  });

});

