'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, User } from 'lucide-react';
import { useClickOutside } from '@/hooks/a11y/useClickOutside';
import clsx from 'clsx';

export default function AccountMenu({ name, logout, isMobile, onNavigate }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const router = useRouter();

    useClickOutside(containerRef, () => setOpen(false));

    const handleSelect = (action) => {
        setOpen(false);
        action();
    };

    const items = [
        { label: 'Profile', action: () => router.push('/admin/profile') },
        { label: 'My briefs', action: () => router.push('/admin/briefs') },
        { label: 'Logout', action: logout, destructive: true },
    ];

    if (isMobile) {
        return (
            <div className="flex flex-col w-full h-[100%]">
                <button
                    onClick={() => { onNavigate?.(); router.push('/admin/profile'); }}
                    aria-label="profile"
                    className="flex w-full items-center justify-center rounded-full px-3 py-2 font-work font-medium text-foreground hover:bg-gray-a3 transition-colors cursor-pointer"
                >
                    Profile
                </button>
                <button
                    onClick={() => { onNavigate?.(); logout(); }}
                    aria-label="logout"
                    className="flex w-full items-center justify-center rounded-full px-3 py-2 font-work font-medium text-error hover:bg-error-subtle transition-colors cursor-pointer"
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                aria-label="account menu toggle"
                aria-haspopup="true"
                aria-controls="account-menu"
                aria-expanded={open}
                className={clsx(
                    'inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium font-work',
                    'text-foreground bg-transparent hover:bg-gray-a3 transition-colors',
                    'focus-visible:custom-focus cursor-pointer',
                )}
            >
                {`Welcome, ${name.split(' ')[0]}`} {/* Show only first name */}
                <ChevronDown
                    size={16}
                    className={clsx('stroke-[1.5] text-text-muted transition-transform duration-150', open && 'rotate-180')}
                />
            </button>

            {open && (
                <div className={clsx(
                    'absolute right-0 top-full mt-1.5 z-50 min-w-[160px] overflow-hidden',
                    'rounded-3xl border border-border bg-background shadow-xl',
                    'animate-in fade-in slide-in-from-top-1 duration-150',
                    'flex flex-col p-1'
                )} role="menu" aria-label="account menu" id="account-menu">
                    {items.map(({ label, action, destructive }) => (
                        <button
                            key={label}
                            role="menuitem"
                            onClick={() => handleSelect(action)}
                            className={clsx(
                                'flex w-full items-center rounded-full px-3 py-2 text-sm font-work text-left',
                                'outline-none transition-colors cursor-pointer',
                                destructive
                                    ? 'text-error hover:bg-error-subtle'
                                    : 'text-foreground hover:bg-gray-a3'
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
