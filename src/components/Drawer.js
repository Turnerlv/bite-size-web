'use client';

import React from 'react';
import Button from './Button';
import { useClickOutside } from '@/hooks/a11y/useClickOutside';
import { useFocusReturn } from '@/hooks/a11y/useFocusReturn';
import { useKeyboardNavigation } from '@/hooks/a11y/useKeyboardNavigation';
import { X } from 'lucide-react';

export default function Drawer({
    open,
    onClose,
    title,
    children,
    side = 'right',
    triggerRef, // for focus return
}) {
    const panelRef = React.useRef(null);
    const titleId = React.useId();
    const descriptionId = React.useId();

    const cx = (...classes) => classes.filter(Boolean).join(' ');

    // 1) Click outside to close
    useClickOutside({
        ref: panelRef,
        enabled: open,
        onOutsideClick: () => {
            if (open) onClose();
        },
    });

    // 2) Focus return to trigger when drawer closes
    useFocusReturn({
        open,
        returnRef: triggerRef,
    });

    // 3) Keyboard handling: ESC + focus trapping / navigation
    useKeyboardNavigation({
        enabled: open,
        containerRef: panelRef,
        onEscape: onClose,
    });

    // 4) Lock page scroll while open
    React.useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // Position by side
    const sidePosition = {
        right: 'right-0 top-0 h-full w-80',
        left: 'left-0 top-0 h-full w-80',
        bottom: 'bottom-0 left-0 w-full h-80',
        top: 'top-0 left-0 w-full h-80',
    };

    // Closed transform per side
    const closedTransform = {
        right: 'translate-x-full',
        left: '-translate-x-full',
        bottom: 'translate-y-full',
        top: '-translate-y-full',
    };

    const openTransform = 'translate-x-0 translate-y-0';

    return (
        <div
            className={cx(
                'fixed inset-0 z-50 flex',
                'transition-opacity duration-300',
                open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            )}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div
                className={cx(
                    'absolute inset-0 bg-black/40 backdrop-blur-sm',
                    'transition-opacity duration-300',
                    open ? 'opacity-100' : 'opacity-0'
                )}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer panel */}
            <div
                ref={panelRef}
                className={cx(
                    'absolute bg-background border border-border shadow-xl p-4 outline-none',
                    'transition-transform duration-300 will-change-transform',
                    sidePosition[side],
                    open ? openTransform : closedTransform[side]
                )}
            >
                <header className="flex items-center justify-between gap-4 mb-4">
                    <h2 id={titleId} className="text-lg font-semibold">
                        {title}
                    </h2>
                    <Button
                        variant="ghost"
                        size="md"
                        iconPosition="only"
                        icon={X}
                        onClick={onClose}
                        aria-label="Close drawer"
                    >
                        &times;
                    </Button>
                </header>

                <div id={descriptionId}>
                    {children}
                </div>
            </div>
        </div>
    );
}
