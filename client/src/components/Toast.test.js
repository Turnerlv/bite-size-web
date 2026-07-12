import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast, ToastProvider, ToastViewport } from './Toast';

// Wrap in required Radix provider
const renderToast = (props) =>
  render(
    <ToastProvider>
      <Toast {...props} />
      <ToastViewport />
    </ToastProvider>
  );

describe('Toast', () => {

  it('renders the title when open', () => {
    renderToast({ open: true, onOpenChange: jest.fn(), title: 'Saved successfully' });
    expect(screen.getByText('Saved successfully')).toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    renderToast({
      open: true,
      onOpenChange: jest.fn(),
      title: 'Done',
      description: 'Your changes have been saved.',
    });
    expect(screen.getByText('Your changes have been saved.')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    renderToast({ open: false, onOpenChange: jest.fn(), title: 'Hidden toast' });
    expect(screen.queryByText('Hidden toast')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when dismiss button is clicked', () => {
    const handleChange = jest.fn();
    renderToast({ open: true, onOpenChange: handleChange, title: 'Alert' });
    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }));
    expect(handleChange).toHaveBeenCalledWith(false);
  });

});
