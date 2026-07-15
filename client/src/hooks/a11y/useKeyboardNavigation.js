'use client';

import { useState, useRef, useEffect } from 'react';

export const useKeyboardNavigation = (itemCount, onClose) => {
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const itemRefs = useRef([]);

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex((prev) => (prev + 1) % itemCount);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex((prev) => (prev - 1 + itemCount) % itemCount);
                break;
            case 'Home':
                e.preventDefault();
                setFocusedIndex(0);
                break;
            case 'End':
                e.preventDefault();
                setFocusedIndex(itemCount - 1);
                break;
            case 'Enter':
                if (e.target.tagName === 'TEXTAREA') break;
                if (e.target.id === 'password') break;
                if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
                    e.preventDefault();
                    itemRefs.current[focusedIndex].click();
                }
                break;
            case 'Escape':
                e.preventDefault();
                if (focusedIndex !== -1) setFocusedIndex(-1);
                if (onClose) onClose();
                break;
        }
    };

    useEffect(() => {
        if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
            itemRefs.current[focusedIndex].focus();
        }
    }, [focusedIndex]);

    return {
        itemRefs,
        focusedIndex,
        setFocusedIndex,
        handleKeyDown,
    };
};
