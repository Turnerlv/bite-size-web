import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm as useFormspree } from '@formspree/react';

// ─── Mock @formspree/react ────────────────────────────────────────────────────
// Controls formspreeState without making real network requests
jest.mock('@formspree/react', () => ({
  useForm: jest.fn(),
}));

// ─── Mock Radix UI Select as a native <select> ────────────────────────────────
// Radix UI portals don't work in JSDOM — swap in a plain select for testability
jest.mock('./Select', () => ({
  Select: React.forwardRef(function Select({ label, id, name, options = [], error, onChange }, ref) {
    return (
      <div>
        {label && <label htmlFor={id}>{label}</label>}
        <select id={id} name={name} onChange={onChange} ref={ref} defaultValue="">
          <option value="" disabled></option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p>{error}</p>}
      </div>
    );
  }),
}));

// ─── Import component under test ──────────────────────────────────────────────
import ContactForm from './ContactForm';

// ─── Test suite ───────────────────────────────────────────────────────────────
describe('ContactForm', () => {

  const mockSendToFormspree = jest.fn();
  const mockCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Default state: not yet submitted
    useFormspree.mockReturnValue([{ succeeded: false, submitting: false }, mockSendToFormspree]);
  });

  it('renders without crashing', () => {
    render(<ContactForm cancel={mockCancel} />);
    expect(screen.getByRole('form', { name: /contact form/i })).toBeInTheDocument();
  });

  it('renders success state when formspree reports succeeded', () => {
    useFormspree.mockReturnValue([{ succeeded: true, submitting: false }, mockSendToFormspree]);

    render(<ContactForm cancel={mockCancel} />);

    expect(screen.getByText("Thanks!")).toBeInTheDocument();
    expect(screen.getByText(/we'll be in touch soon/i)).toBeInTheDocument();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });

  it('calls sendToFormspree with form data on valid submit', async () => {
    const user = userEvent.setup();
    render(<ContactForm cancel={mockCancel} />);

    await user.type(screen.getByLabelText(/your name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await userEvent.selectOptions(screen.getByLabelText(/what brings you here/i), 'project');
    await user.type(screen.getByLabelText(/what would you like to explore/i), 'I have a great idea.');
    await user.click(screen.getByRole('button', { name: /let's talk/i }));

    await waitFor(() => {
      expect(mockSendToFormspree).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Jane Doe',
          email: 'jane@example.com',
          reason: 'project',
          message: 'I have a great idea.',
        })
      );
    });
  });

  it('displays required field errors when submitted empty', async () => {
    const user = userEvent.setup();
    render(<ContactForm cancel={mockCancel} />);

    await user.click(screen.getByRole('button', { name: /let's talk/i }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(screen.getByText('Please select a reason')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });

  it('displays a validation error for an invalid email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm cancel={mockCancel} />);

    await user.type(screen.getByLabelText(/your name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await userEvent.selectOptions(screen.getByLabelText(/what brings you here/i), 'consulting');
    await user.type(screen.getByLabelText(/what would you like to explore/i), 'Hello.');
    await user.click(screen.getByRole('button', { name: /let's talk/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('calls cancel when the Cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<ContactForm cancel={mockCancel} />);

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

});
