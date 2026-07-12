import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ─── Mock a11y hooks ──────────────────────────────────────────────────────────
jest.mock('../../hooks/a11y/useKeyboardNavigation', () => ({
  useKeyboardNavigation: jest.fn(() => ({
    itemRefs: { current: [] },
    focusedIndex: -1,
    setFocusedIndex: jest.fn(),
    handleKeyDown: jest.fn(),
  })),
}));
jest.mock('../../hooks/a11y/useClickOutside', () => ({ useClickOutside: jest.fn() }));
jest.mock('../../hooks/a11y/useFocusReturn', () => ({ useFocusReturn: jest.fn() }));

jest.mock('next/link', () => {
  const Link = ({ children, href }) => <a href={href}>{children}</a>;
  Link.displayName = 'Link';
  return Link;
});

import { MegaMenu } from './MegaMenu';

const items = [
  { label: 'React', description: 'UI library', href: '/bites/react', icon: 'Code' },
  { label: 'Node', description: 'JS runtime', href: '/bites/node', icon: 'Server' },
];

describe('MegaMenu', () => {

  const baseProps = {
    label: 'Products',
    itemKey: 'products',
    items,
    onClose: jest.fn(),
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    triggerRef: { current: null },
    openInteraction: 'click',
  };

  beforeEach(() => jest.clearAllMocks());

  it('returns null when isOpen is false', () => {
    const { container } = render(<MegaMenu {...baseProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the menu panel when isOpen is true', () => {
    render(<MegaMenu {...baseProps} isOpen />);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('renders all items', () => {
    render(<MegaMenu {...baseProps} isOpen />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node')).toBeInTheDocument();
  });

  it('has the correct aria-label on the menu panel', () => {
    render(<MegaMenu {...baseProps} isOpen />);
    expect(screen.getByRole('menu', { name: /products submenu/i })).toBeInTheDocument();
  });

});
