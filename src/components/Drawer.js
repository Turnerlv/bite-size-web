'use client';

import React, { useEffect, useState, useRef, useId } from 'react';
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
    side = 'bottom', // Change back to 'right' as default
    triggerRef, // for focus return
}) {
    const panelRef = useRef(null);
    const [focusableCount, setFocusableCount] = useState(0)

    const titleId = useId();
    const descriptionId = useId();

    const cx = (...classes) => classes.filter(Boolean).join(' ');

    const {
        itemRefs,
        setFocusedIndex,
        handleKeyDown
    } = useKeyboardNavigation(focusableCount, onClose);

    // 1) Click outside to close
    useClickOutside(panelRef, () => {
        setFocusedIndex(-1);
        onClose();
    });

    // 2) Focus return to trigger when drawer closes
    useFocusReturn(open, triggerRef);

    // 3) Focus first form element on open
    useEffect(() => {
        if (!open || !panelRef.current) return

        const nodes = Array.from(
            panelRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        )

        itemRefs.current = nodes;
        setFocusableCount(nodes.legth);
        setFocusedIndex(1)
        nodes[0]?.focus();
    }, [open, children, itemRefs, setFocusedIndex]);

    // 4) Lock page scroll while open
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // Position by side
    const sidePosition = {
        right: 'right-0 top-0 h-[min(100vh,75vh)] w-80',
        left: 'left-0 top-0 h-[min(100vh,75vh)] w-80',
        bottom: 'bottom-0 w-full h-[max(85vh,85%)]',
        top: 'top-0 left-0 w-full h-[max(75vh,75%)]',
    };

    // Closed transform per side
    const closedTransform = {
        right: 'translate-x-full',
        left: '-translate-x-full',
        bottom: 'translate-y-full',
        top: '-translate-y-full',
    };

    // Open transform per side (reset only the relevant axis)
    const openTransform = {
        right: 'translate-x-0',
        left: 'translate-x-0',
        bottom: 'translate-y-0',
        top: 'translate-y-0',
    };

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
                tabIndex={-1}
                onKeyDown={handleKeyDown}
                className={cx(
                    'absolute bg-background border border-border shadow-xl py-6 page-padding outline-none flex flex-col items-center',
                    'transition-transform duration-300 will-change-transform',
                    sidePosition[side],
                    open ? openTransform[side] : closedTransform[side]
                )}
            >
                <header className="w-full max-w-screen-md flex items-center justify-between gap-4 mb-8">
                    <h2 id={titleId} className="heading-3">
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

                <div
                    id={descriptionId}
                    className="max-w-screen-md w-full"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
