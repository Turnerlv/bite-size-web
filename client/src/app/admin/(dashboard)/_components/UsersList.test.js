import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNotification } from '@/context/NotificationContext';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('next/link', () => {
  const Link = ({ children, href }) => <a href={href}>{children}</a>;
  Link.displayName = 'Link';
  return Link;
});
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

import UsersList from './UsersList';

const sampleUsers = [
  { id: '1', name: 'Alice', email: 'alice@example.com', createdAt: '2026-01-01' },
  { id: '2', name: 'Bob', email: 'bob@example.com', createdAt: '2026-02-01' },
];

describe('UsersList', () => {

  const mockShowToast = jest.fn();
  const mockRefresh = jest.fn();
  const mockOnDeleteUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ refresh: mockRefresh });
    useNotification.mockReturnValue({ showToast: mockShowToast });
  });

  it('renders a row for each user', () => {
    render(<UsersList initialUsers={sampleUsers} onDeleteUser={mockOnDeleteUser} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows empty state when no users are provided', () => {
    render(<UsersList initialUsers={[]} onDeleteUser={mockOnDeleteUser} />);
    expect(screen.getByText(/no records available/i)).toBeInTheDocument();
  });

  it('calls onDeleteUser with the user id, removes them from the list, and shows success toast', async () => {
    mockOnDeleteUser.mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(<UsersList initialUsers={sampleUsers} onDeleteUser={mockOnDeleteUser} />);

    const triggers = screen.getAllByRole('button', { name: /row actions/i });
    await user.click(triggers[0]);
    await waitFor(() => screen.getByText('Delete'));
    await user.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(mockOnDeleteUser).toHaveBeenCalledWith('1');
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
      expect(mockShowToast).toHaveBeenCalledWith('User deleted successfully', null, 'success');
    });
  });

});
