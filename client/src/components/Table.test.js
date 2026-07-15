import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/link', () => {
  const Link = ({ children, href }) => <a href={href}>{children}</a>;
  Link.displayName = 'Link';
  return Link;
});

import Table from './Table';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
];

const data = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
];

describe('Table', () => {

  it('renders column headers', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('renders a row for each data item', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows empty state message when data is empty', () => {
    render(<Table columns={columns} data={[]} />);
    expect(screen.getByText(/no records available/i)).toBeInTheDocument();
  });

  it('displays the item count', () => {
    render(<Table columns={columns} data={data} itemName="users" />);
    expect(screen.getByText('2 users')).toBeInTheDocument();
  });

  it('calls onRowClick when a row is clicked', async () => {
    const handleRowClick = jest.fn();
    const user = userEvent.setup();
    render(<Table columns={columns} data={data} onRowClick={handleRowClick} />);
    await user.click(screen.getByText('Alice'));
    expect(handleRowClick).toHaveBeenCalledWith({ id: '1', name: 'Alice' });
  });

  it('renders the Add button and calls onAddClick when clicked', async () => {
    const handleAddClick = jest.fn();
    const user = userEvent.setup();
    render(<Table columns={columns} data={data} onAddClick={handleAddClick} addActionLabel="Add User" />);
    const addBtn = screen.getByRole('button', { name: /add user/i });
    expect(addBtn).toBeInTheDocument();
    await user.click(addBtn);
    expect(handleAddClick).toHaveBeenCalledTimes(1);
  });

  it('renders row action trigger buttons when rowActions are provided', () => {
    const rowActions = [{ label: 'Delete', onClick: jest.fn(), destructive: true }];
    render(<Table columns={columns} data={data} rowActions={rowActions} />);
    const triggers = screen.getAllByRole('button', { name: /row actions/i });
    expect(triggers).toHaveLength(2); // one per row
  });

  it('uses a custom render function for columns', () => {
    const customColumns = [
      { key: 'id', label: 'ID', render: (row) => <span>#{row.id}</span> },
      { key: 'name', label: 'Name' },
    ];
    render(<Table columns={customColumns} data={data} />);
    expect(screen.getByText('#1')).toBeInTheDocument();
  });

});
