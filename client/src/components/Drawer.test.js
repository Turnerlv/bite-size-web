import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ─── Mock a11y hooks — they use DOM APIs not available in JSDOM ──────────────
jest.mock('../hooks/a11y/useClickOutside', () => ({ useClickOutside: jest.fn() }));
jest.mock('../hooks/a11y/useFocusReturn', () => ({ useFocusReturn: jest.fn() }));
jest.mock('../hooks/a11y/useKeyboardNavigation', () => ({
  useKeyboardNavigation: jest.fn(() => ({
    itemRefs: { current: [] },
    setFocusedIndex: jest.fn(),
    handleKeyDown: jest.fn(),
  })),
}));

// ─── Mock next/link ───────────────────────────────────────────────────────────
jest.mock('next/link', () => {
  const Link = ({ children, href }) => <a href={href}>{children}</a>;
  Link.displayName = 'Link';
  return Link;
});

import Drawer from './Drawer';

const baseProps = {
  open: true,
  onClose: jest.fn(),
  title: 'Contact us',
  children: <p>Drawer content</p>,
};

describe('Drawer', () => {

  beforeEach(() => jest.clearAllMocks());

  it('renders the title and children when open', () => {
    render(<Drawer {...baseProps} />);
    expect(screen.getByText('Contact us')).toBeInTheDocument();
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('has role="dialog" with aria-modal', () => {
    render(<Drawer {...baseProps} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('calls onClose when the close button is clicked', async () => {
    const handleClose = jest.fn();
    const user = userEvent.setup();
    render(<Drawer {...baseProps} onClose={handleClose} />);
    await user.click(screen.getByRole('button', { name: /close drawer/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const handleClose = jest.fn();
    const user = userEvent.setup();
    const { container } = render(<Drawer {...baseProps} onClose={handleClose} />);
    // backdrop is the aria-hidden div immediately inside the outer container
    const backdrop = container.querySelector('[aria-hidden="true"]');
    await user.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('is not pointer-interactive when closed', () => {
    const { container } = render(<Drawer {...baseProps} open={false} />);
    const outer = container.firstChild;
    expect(outer.className).toMatch(/pointer-events-none/);
  });

});
