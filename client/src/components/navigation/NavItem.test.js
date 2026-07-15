import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavItem } from './NavItem';

describe('NavItem', () => {

  it('renders a button with the label', () => {
    render(<NavItem label="Products" itemKey="products" isOpen={false} onClick={jest.fn()} />);
    expect(screen.getByRole('button', { name: /products/i })).toBeInTheDocument();
  });

  it('sets aria-haspopup="true"', () => {
    render(<NavItem label="Products" itemKey="products" isOpen={false} onClick={jest.fn()} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'true');
  });

  it('sets aria-expanded to false when closed', () => {
    render(<NavItem label="Products" itemKey="products" isOpen={false} onClick={jest.fn()} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-expanded to true when open', () => {
    render(<NavItem label="Products" itemKey="products" isOpen onClick={jest.fn()} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onClick when the button is clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(<NavItem label="Products" itemKey="products" isOpen={false} onClick={handleClick} />);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onMouseEnter and onMouseLeave handlers', async () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    const user = userEvent.setup();
    render(
      <NavItem
        label="Products"
        itemKey="products"
        isOpen={false}
        onClick={jest.fn()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
    await user.hover(screen.getByRole('button'));
    expect(handleMouseEnter).toHaveBeenCalled();
    await user.unhover(screen.getByRole('button'));
    expect(handleMouseLeave).toHaveBeenCalled();
  });

});
