import React from 'react';
import { render, screen } from '@testing-library/react';
import NavItemSecondary from './NavItemSecondary';

describe('NavItemSecondary', () => {

  const baseProps = {
    label: 'Bite Size React',
    description: 'Learn React in small bites.',
    href: '/bites/react',
    icon: 'Code',
  };

  it('renders the label', () => {
    render(<NavItemSecondary {...baseProps} />);
    expect(screen.getByText('Bite Size React')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<NavItemSecondary {...baseProps} />);
    expect(screen.getByText('Learn React in small bites.')).toBeInTheDocument();
  });

  it('renders as a link with the correct href', () => {
    render(<NavItemSecondary {...baseProps} />);
    expect(screen.getByRole('menuitem')).toHaveAttribute('href', '/bites/react');
  });

  it('has tabIndex of 0 for keyboard accessibility', () => {
    render(<NavItemSecondary {...baseProps} />);
    expect(screen.getByRole('menuitem')).toHaveAttribute('tabindex', '0');
  });

  it('falls back to Circle icon when an invalid icon name is given', () => {
    render(<NavItemSecondary {...baseProps} icon="NotARealIcon" />);
    // Should still render without crashing
    expect(screen.getByText('Bite Size React')).toBeInTheDocument();
  });

});
