'use client';

import { useEffect } from 'react';

export const useFocusReturn = (isOpen, triggerRef) => {
    useEffect(() => {
        if (!isOpen && triggerRef?.current) {
            triggerRef.current.focus();
        }
    }, [isOpen, triggerRef]);
};
