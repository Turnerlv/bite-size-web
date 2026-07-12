'use client';

import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { MoreHorizontal } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Button from '@/components/Button';

/**
 * @typedef {Object} Column
 * @property {string} key - Used to access data from the row
 * @property {string} label - Display label in the header
 * @property {(row: any) => React.ReactNode} [render] - Optional custom render function
 */

/**
 * @typedef {Object} TableAction
 * @property {string} label - Action label
 * @property {(row: any) => void} onClick - Action handler
 * @property {boolean} [destructive] - If true, styles as destructive
 */

/**
 * @typedef {Object} TableProps
 * @property {Column[]} columns - Configuration for table columns
 * @property {any[]} data - The data array to display
 * @property {(row: any) => void} [onRowClick] - Callback for row clicks
 * @property {() => void} [onAddClick] - Callback for the 'Add Item' button
 * @property {TableAction[]} [rowActions] - Actions available in the row-level dropdown
 * @property {string} [itemName="Items"] - Noun used in the items count
 * @property {string} [addActionLabel="Add Item"] - Label mapping for the add action button
 */

function RowActionsMenu({ row, rowActions }) {
    const [isReady, setIsReady] = useState(false);
    const triggerRef = useRef(null);

    return (
        <DropdownMenu.Root onOpenChange={(open) => { if (!open) setIsReady(false); }}>
            <DropdownMenu.Trigger asChild>
                <button
                    ref={triggerRef}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center rounded-full px-2 py-2 text-foreground bg-transparent hover:bg-gray-a3 data-[state=open]:bg-gray-a3 transition-colors focus-visible:custom-focus cursor-pointer outline-none z-10"
                    aria-label="Row actions"
                >
                    <MoreHorizontal className="w-6 h-6 stroke-[1.5]" />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    position="popper"
                    sideOffset={6}
                    align="end"
                    onPointerDownOutside={(e) => {
                        if (triggerRef.current?.contains(e.target)) {
                            e.preventDefault();
                        }
                    }}
                    onAnimationEnd={(e) => {
                        if (e.currentTarget.dataset.state === 'open') setIsReady(true);
                    }}
                    className={clsx(
                        'z-50 min-w-[160px] overflow-hidden',
                        'rounded-3xl border border-border bg-background shadow-xl p-1',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out',
                        'data-[state=open]:fade-in data-[state=closed]:fade-out',
                        'data-[state=open]:slide-in-from-top-1/2 data-[state=closed]:slide-out-to-top-1/2',
                        'data-[state=closed]:pointer-events-none'
                    )}
                >
                    {rowActions.map((action, i) => (
                        <DropdownMenu.Item
                            key={i}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!isReady) return;
                                action.onClick(row);
                            }}
                            className={clsx(
                                'relative flex cursor-pointer select-none items-center rounded-full px-3 py-2 text-sm outline-none transition-colors border border-transparent',
                                'font-work text-foreground',
                                'data-[highlighted]:bg-gray-a3 data-[highlighted]:text-foreground data-[highlighted]:border-transparent',
                                action.destructive && 'text-red-500 data-[highlighted]:text-red-600'
                            )}
                        >
                            {action.label}
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}

export default function Table({
    columns = [],
    data = [],
    onRowClick,
    onAddClick,
    rowActions = [],
    itemName = "Items",
    addActionLabel = "Add Item"
}) {
    return (
        <div className="flex flex-col gap-4">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <h3 className="px-4 font-work text-base text-foreground">
                    {data.length} {itemName}
                </h3>
                {onAddClick && (
                    <Button variant="primary" size="md" onClick={onAddClick}>
                        {addActionLabel}
                    </Button>
                )}
            </div>

            {/* Mobile-responsive wrapper */}
            <div className="w-full overflow-x-auto bg-transparent">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="border-b border-border bg-gray-a2 text-xs font-roboto uppercase tracking-[0.1em] text-text-muted">
                            {columns.map(col => (
                                <th key={col.key} className="p-4 px-4 font-medium whitespace-nowrap">
                                    {col.label}
                                </th>
                            ))}
                            {rowActions.length > 0 && (
                                <th className="p-4 px-4 w-16">
                                    <span className="sr-only">Actions</span>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr
                                key={row.id || idx}
                                onClick={() => onRowClick && onRowClick(row)}
                                className={clsx(
                                    "group transition-colors",
                                    onRowClick ? "cursor-pointer hover:bg-gray-a2" : "hover:bg-gray-a1"
                                )}
                            >
                                {columns.map(col => (
                                    <td key={col.key} className="py-2 px-4 font-work text-sm text-foreground align-middle">
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}

                                {/* Row Actions (End Column) */}
                                {rowActions.length > 0 && (
                                    <td className="py-2 px-6 align-middle text-right" onClick={(e) => e.stopPropagation()}>
                                        <RowActionsMenu row={row} rowActions={rowActions} />
                                    </td>
                                )}
                            </tr>
                        ))}

                        {/* Empty state */}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={columns.length + (rowActions.length > 0 ? 1 : 0)} className="p-8 text-center text-text-muted font-work text-sm">
                                    No records available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
