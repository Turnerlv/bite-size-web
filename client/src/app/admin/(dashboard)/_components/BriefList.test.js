import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('next/link', () => {
  const Link = ({ children, href }) => <a href={href}>{children}</a>;
  Link.displayName = 'Link';
  return Link;
});
jest.mock('../../../../context/AuthContext', () => ({ useAuth: jest.fn() }));
jest.mock('../../../../context/NotificationContext', () => ({ useNotification: jest.fn() }));
jest.mock('@radix-ui/react-dropdown-menu', () => {
  const React = require('react');
  const Ctx = React.createContext({ open: false, setOpen: () => {} });
  const Root = ({ children, onOpenChange }) => {
    const [open, setOpen] = React.useState(false);
    const value = { open, setOpen: (v) => { setOpen(v); onOpenChange?.(v); } };
    return React.createElement(Ctx.Provider, { value }, children);
  };
  const Trigger = ({ children, asChild }) => {
    const { open, setOpen } = React.useContext(Ctx);
    const toggle = () => setOpen(!open);
    if (asChild) {
      const child = React.Children.only(children);
      const origOnClick = child.props?.onClick;
      return React.cloneElement(child, { onClick: (e) => { origOnClick?.(e); toggle(); } });
    }
    return React.createElement('button', { onClick: toggle }, children);
  };
  const Portal = ({ children }) => React.createElement(React.Fragment, null, children);
  const Content = ({ children, onAnimationEnd }) => {
    const { open } = React.useContext(Ctx);
    React.useEffect(() => {
      if (open && onAnimationEnd) onAnimationEnd({ currentTarget: { dataset: { state: 'open' } } });
    }, [open]);
    return open ? React.createElement('div', null, children) : null;
  };
  const Item = ({ children, onClick }) =>
    React.createElement('div', { role: 'menuitem', tabIndex: -1, onClick }, children);
  return { Root, Trigger, Portal, Content, Item };
});

import BriefList from './BriefList';

const sampleBriefs = [
  { id: '1', title: 'Brief One', category: 'Architecture', author: 'Jane', slug: 'brief-one', createdAt: '2026-01-01' },
  { id: '2', title: 'Brief Two', category: 'DevOps', author: 'Bob', slug: 'brief-two', createdAt: '2026-02-01' },
];

describe('BriefList', () => {

  const mockPush = jest.fn();
  const mockRefresh = jest.fn();
  const mockOnDeleteBrief = jest.fn();

  const mockShowToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockPush, refresh: mockRefresh });
    useAuth.mockReturnValue({ isAdmin: false });
    useNotification.mockReturnValue({ showToast: mockShowToast });
  });

  it('renders a row for each brief', () => {
    render(<BriefList initialBriefs={sampleBriefs} onDeleteBrief={mockOnDeleteBrief} />);
    expect(screen.getByText('Brief One')).toBeInTheDocument();
    expect(screen.getByText('Brief Two')).toBeInTheDocument();
  });

  it('shows empty state when no briefs are provided', () => {
    render(<BriefList initialBriefs={[]} onDeleteBrief={mockOnDeleteBrief} />);
    expect(screen.getByText(/no records available/i)).toBeInTheDocument();
  });

  it('navigates to the edit page when a row is clicked', async () => {
    const user = userEvent.setup();
    render(<BriefList initialBriefs={sampleBriefs} onDeleteBrief={mockOnDeleteBrief} />);
    await user.click(screen.getByText('Brief One'));
    expect(mockPush).toHaveBeenCalledWith('/admin/briefs/1/edit');
  });

  it('calls onDeleteBrief with the brief id and removes it from the list', async () => {
    mockOnDeleteBrief.mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(<BriefList initialBriefs={sampleBriefs} onDeleteBrief={mockOnDeleteBrief} />);

    const triggers = screen.getAllByRole('button', { name: /row actions/i });
    await user.click(triggers[0]);
    await waitFor(() => screen.getByText('Delete'));
    await user.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(mockOnDeleteBrief).toHaveBeenCalledWith('1');
      expect(screen.queryByText('Brief One')).not.toBeInTheDocument();
    });
  });

  it('shows the Author column when the user is admin', () => {
    useAuth.mockReturnValue({ isAdmin: true });
    render(<BriefList initialBriefs={sampleBriefs} onDeleteBrief={mockOnDeleteBrief} />);
    expect(screen.getByText('Author')).toBeInTheDocument();
  });

});
