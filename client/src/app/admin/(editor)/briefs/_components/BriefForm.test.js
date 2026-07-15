import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNotification } from '@/context/NotificationContext';
import { useRouter, usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));
jest.mock('../../../../../context/NotificationContext', () => ({ useNotification: jest.fn() }));

// ─── Mock EditorJS and its plugins (dynamic imports) ─────────────────────────
jest.mock('@editorjs/editorjs', () => {
  const MockEditor = jest.fn().mockImplementation(() => ({
    isReady: Promise.resolve(),
    save: jest.fn().mockResolvedValue({ blocks: [] }),
    destroy: jest.fn(),
    clear: jest.fn().mockResolvedValue(undefined),
  }));
  MockEditor.default = MockEditor;
  return MockEditor;
});
jest.mock('@editorjs/header', () => jest.fn());
jest.mock('@editorjs/list', () => jest.fn());
jest.mock('@editorjs/paragraph', () => jest.fn());

// ─── Mock Radix Select as a native <select> ───────────────────────────────────
jest.mock('../../../../../components/form/Select', () => ({
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

// ─── Mock format utilities ────────────────────────────────────────────────────
jest.mock('../../../../../utils/formatFromEditor', () => jest.fn((data) => JSON.stringify(data)));
jest.mock('../../../../../utils/formatToEditor', () => jest.fn((data) => ({ blocks: [] })));

import BriefForm from './BriefForm';

const emptyBriefData = { title: '', description: '', category: '', content: '', image_url: '' };

describe('BriefForm', () => {

  const mockPush = jest.fn();
  const mockRefresh = jest.fn();
  const mockShowToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockPush, refresh: mockRefresh });
    useNotification.mockReturnValue({ showToast: mockShowToast });
  });

  it('renders the "Create new brief" heading when on the /new path', async () => {
    usePathname.mockReturnValue('/admin/briefs/new');
    await act(async () => { render(<BriefForm briefData={emptyBriefData} onSubmit={jest.fn()} />); });
    expect(screen.getByText('Create new brief')).toBeInTheDocument();
  });

  it('renders the "Edit brief" heading when on an edit path', async () => {
    usePathname.mockReturnValue('/admin/briefs/123/edit');
    await act(async () => { render(<BriefForm briefData={emptyBriefData} onSubmit={jest.fn()} />); });
    expect(screen.getByText('Edit brief')).toBeInTheDocument();
  });

  it('renders the Title and Description fields', async () => {
    usePathname.mockReturnValue('/admin/briefs/new');
    await act(async () => { render(<BriefForm briefData={emptyBriefData} onSubmit={jest.fn()} />); });
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('calls onSubmit and shows success toast on form submission', async () => {
    usePathname.mockReturnValue('/admin/briefs/new');
    const mockOnSubmit = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    await act(async () => { render(<BriefForm briefData={emptyBriefData} onSubmit={mockOnSubmit} />); });

    await user.type(screen.getByLabelText(/title/i), 'My Test Brief');
    await user.type(screen.getByLabelText(/description/i), 'A short description.');
    await user.selectOptions(screen.getByLabelText(/category/i), 'Architecture');
    await user.click(screen.getByRole('button', { name: /submit post/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledWith('Brief created successfully', null, 'success');
    });
  });

  it('shows error toast when onSubmit throws', async () => {
    usePathname.mockReturnValue('/admin/briefs/new');
    const mockOnSubmit = jest.fn().mockRejectedValue(new Error('Server error'));
    const user = userEvent.setup();

    await act(async () => { render(<BriefForm briefData={emptyBriefData} onSubmit={mockOnSubmit} />); });

    await user.type(screen.getByLabelText(/title/i), 'My Brief');
    await user.type(screen.getByLabelText(/description/i), 'A short description.');
    await user.selectOptions(screen.getByLabelText(/category/i), 'Architecture');
    await user.click(screen.getByRole('button', { name: /submit post/i }));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('Failed to create brief', null, 'error');
    });
  });

});
