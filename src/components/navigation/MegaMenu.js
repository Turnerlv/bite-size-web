'use client';

import React, { useEffect, useRef } from 'react';
import NavItemSecondary from './NavItemSecondary';
import { useKeyboardNavigation } from '@/hooks/a11y/useKeyboardNavigation';
import { useClickOutside } from '@/hooks/a11y/useClickOutside';
import { useFocusReturn } from '@/hooks/a11y/useFocusReturn';
import Button from '../Button';
import { ChevronLeft } from 'lucide-react';

export const MegaMenu = ({
    label,
    itemKey,
    isOpen,
    triggerRef,
    items,
    onClose,
    onMouseEnter,
    onMouseLeave
}) => {
    const panelRef = useRef();
    const {
        itemRefs,
        focusedIndex,
        setFocusedIndex,
        handleKeyDown
    } = useKeyboardNavigation(items.length, onClose);

    useClickOutside(panelRef, () => {
        setFocusedIndex(-1);
        onClose();
    });

    useFocusReturn(isOpen, triggerRef);

    useEffect(() => {
        if (isOpen) {
            panelRef.current?.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            id={`menu-${itemKey}`}
            role="menu"
            tabIndex={1}
            ref={panelRef}
            onKeyDown={handleKeyDown}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            aria-label={`${itemKey} submenu`}
            className={[
                // Size
                "w-full max-w-[1200px]",
                // Spacing
                "mx-auto pt-4",
                // Flex & Grid
                "flex-shrink-0",
                // Effects
                "focus:outline-none",
            ].join(" ")}
        >
            <div
                className={[
                    // Size
                    "max-w-7xl",
                    // Spacing
                    "gap-4 mx-auto pr-8 sm:pl-12 sm:pr-4 md:pl-17 md:pr-8 sm:py-6",
                    // Flex & Grid
                    "flex flex-col",
                    // Border
                    "sm:border-t border-border",
                ].join(" ")}
            >
                <div
                    className={[
                        // Flex & Grid
                        "flex flex-row items-center",
                        // Spacing
                        "gap-1 -ml-10 sm:ml-0",
                    ].join(" ")}
                >
                    <div
                        className={[
                            // Flex & Grid
                            "flex",
                            // Layout (responsive)
                            "sm:hidden",
                        ].join(" ")}
                    >
                        <Button variant="ghost" icon={ChevronLeft} iconPosition="only" onClick={onClose}></Button>
                    </div>
                    <h2
                        className={[
                            // Text & Typography
                            "text-lg font-rubik font-medium",
                        ].join(" ")}
                    >
                        {label}
                    </h2>
                </div>
                <div
                    className={[
                        // Flex & Grid
                        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                        // Spacing
                        "gap-6",
                    ].join(" ")}
                >
                    {items.map((item, index) => (
                        <NavItemSecondary
                            key={index}
                            label={item.label}
                            description={item.description}
                            href={item.href}
                            icon={item.icon}
                            ref={(el) => (itemRefs.current[index] = el)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
