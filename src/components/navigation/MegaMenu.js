import React, { useEffect, useRef } from 'react';
import { useKeyboardNavigation } from '@/hooks/a11y/useKeyboardNavigation';
import { useClickOutside } from '@/hooks/a11y/useClickOutside';
import { useFocusReturn } from '@/hooks/a11y/useFocusReturn';

export const MegaMenu = ({
    itemKey,
    isActive,
    triggerRef,
    items,
    onClose,
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

    useFocusReturn(isActive, triggerRef);

    useEffect(() => {
        if (isActive) {
            panelRef.current?.focus();
        }
    }, [isActive]);


    if (!isActive) return null;

    return (
        <div
            id={`menu-${itemKey}`}
            role="menu"
            tabIndex={-1}
            ref={panelRef}
            onKeyDown={handleKeyDown}
            aria-label={`${itemKey} submenu`}
            className="focus:outline-none"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 px-8 py-6">
                {items.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        role="menuitem"
                        tabIndex={0}
                        ref={(el) => (itemRefs.current[index] = el)}
                        className="block text-sm font-medium hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    );
};
