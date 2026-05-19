'use client';

import { useEffect, useRef } from 'react';

export const useFocusReturn = (isOpen, triggerRef, shouldReturnFocus) => {
    const wasOpenRef = useRef(false);

    useEffect(() => {
        const wasOpen = wasOpenRef.current;

        if (wasOpen && !isOpen && shouldReturnFocus && triggerRef?.current) {
            triggerRef.current.focus();
        }

        wasOpenRef.current = isOpen;
    }, [isOpen, triggerRef, shouldReturnFocus]);
};
