import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextArea } from './TextArea';

describe('TextArea', () => {

  it('renders a labeled textarea', () => {
    render(<TextArea label="Message" id="message" />);
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('displays an error message when error prop is passed', () => {
    render(<TextArea label="Message" id="message" error="Message is required" />);
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  it('shows character counter when maxLength is provided', () => {
    render(<TextArea label="Bio" id="bio" maxLength={200} showCounter />);
    expect(screen.getByText('0 / 200')).toBeInTheDocument();
  });

  it('updates character counter as user types', async () => {
    const user = userEvent.setup();
    render(<TextArea label="Bio" id="bio" maxLength={200} showCounter />);
    await user.type(screen.getByLabelText(/bio/i), 'Hello');
    expect(screen.getByText('5 / 200')).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<TextArea label="Bio" id="bio" onChange={handleChange} />);
    await user.type(screen.getByLabelText(/bio/i), 'Hi');
    expect(handleChange).toHaveBeenCalled();
  });

});
