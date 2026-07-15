import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));
jest.mock('next/link', () => {
  const Link = ({ children, href, className }) => <a href={href} className={className}>{children}</a>;
  Link.displayName = 'Link';
  return Link;
});

import Tabs from './Tabs';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Profile', href: '/admin/profile' },
  { label: 'Briefs', href: '/admin/briefs' },
  { label: 'Users', href: '/admin/users' },
];

describe('Tabs', () => {

  beforeEach(() => jest.clearAllMocks());

  it('renders all tab links', () => {
    usePathname.mockReturnValue('/admin/profile');
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /briefs/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /users/i })).toBeInTheDocument();
  });

  it('applies active style to the tab matching the current pathname', () => {
    usePathname.mockReturnValue('/admin/briefs');
    render(<Tabs tabs={tabs} />);
    const activeLink = screen.getByRole('link', { name: /briefs/i });
    expect(activeLink.className).toMatch(/border-b-primary/);
  });

  it('does not apply active style to non-matching tabs', () => {
    usePathname.mockReturnValue('/admin/briefs');
    render(<Tabs tabs={tabs} />);
    const inactiveLink = screen.getByRole('link', { name: /profile/i });
    expect(inactiveLink.className).not.toMatch(/border-b-primary/);
  });

  it('returns null when tabs array is empty', () => {
    usePathname.mockReturnValue('/admin/profile');
    const { container } = render(<Tabs tabs={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('marks a tab active when pathname starts with its href', () => {
    usePathname.mockReturnValue('/admin/briefs/new');
    render(<Tabs tabs={tabs} />);
    const activeLink = screen.getByRole('link', { name: /briefs/i });
    expect(activeLink.className).toMatch(/border-b-primary/);
  });

});
