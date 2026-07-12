import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {

  it('renders a labeled input field', () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('displays an error message when error prop is passed', () => {
    render(<Input label="Email" id="email" error="Email is required" />);
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<Input label="Name" id="name" onChange={handleChange} />);
    await user.type(screen.getByLabelText(/name/i), 'Jane');
    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is passed', () => {
    render(<Input label="Email" id="email" disabled />);
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
  });

  it('does not render an error when no error prop is passed', () => {
    render(<Input label="Email" id="email" />);
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

});
