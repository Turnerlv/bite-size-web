'use client';

import { useState, useRef, useEffect } from 'react';

export const useKeyboardNavigation = (itemCount) => {
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
            case 'Escape':
                e.preventDefault();
                setFocusedIndex(-1);
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
