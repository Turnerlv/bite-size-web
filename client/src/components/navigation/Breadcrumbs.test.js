import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));
jest.mock('next/link', () => {
  const Link = ({ children, href }) => <a href={href}>{children}</a>;
  Link.displayName = 'Link';
  return Link;
});

import Breadcrumbs from './Breadcrumbs';
import { usePathname } from 'next/navigation';

describe('Breadcrumbs', () => {

  beforeEach(() => jest.clearAllMocks());

  it('renders only the Home crumb on the root path', () => {
    usePathname.mockReturnValue('/');
    render(<Breadcrumbs />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders a crumb for each path segment', () => {
    usePathname.mockReturnValue('/admin/briefs');
    render(<Breadcrumbs />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /admin/i })).toBeInTheDocument();
    // Last segment is a <span>, not a link
    expect(screen.getByText('Briefs')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /briefs/i })).not.toBeInTheDocument();
  });

  it('uses labelMap overrides when provided', () => {
    usePathname.mockReturnValue('/admin');
    render(<Breadcrumbs labelMap={{ admin: 'Dashboard' }} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('uses a custom homeLabel when provided', () => {
    usePathname.mockReturnValue('/');
    render(<Breadcrumbs homeLabel="Start" />);
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('has a nav element with aria-label="Breadcrumb"', () => {
    usePathname.mockReturnValue('/admin');
    render(<Breadcrumbs />);
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  });

});
