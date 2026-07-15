'use client';

import { useCallback, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

/**
 * @param {boolean} initial
 * @param {{ urlKey?: string }} options - If `urlKey` is provided, open state syncs with that query param.
 *   Components using `urlKey` should be wrapped in a Suspense boundary.
 */
export const useDisclosure = (initial = false, options = {}) => {
    const { urlKey: urlKeyInput } = options;

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // urlKey can be a plain string or a React ref ({ current: string }).
    // Using a ref ensures callbacks always read the latest value without
    // stale-closure issues when urlKey is set right before calling open().
    const isExternalRef = urlKeyInput !== null && typeof urlKeyInput === 'object' && 'current' in (urlKeyInput ?? {});
    const internalRef = useRef(isExternalRef ? urlKeyInput.current : (urlKeyInput ?? ''));
    const urlKeyRef = isExternalRef ? urlKeyInput : internalRef;
    if (!isExternalRef) internalRef.current = urlKeyInput ?? '';

    const [isOpen, setIsOpen] = useState(() => {
        if (urlKeyRef.current && searchParams) {
            return searchParams.has(urlKeyRef.current);
        }
        return initial;
    });

    // Sync state with back/forward navigation
    useEffect(() => {
        if (urlKeyRef.current && searchParams) {
            setIsOpen(searchParams.has(urlKeyRef.current));
        }
    }, [searchParams]);

    const updateUrl = useCallback((newValue) => {
        if (!urlKeyRef.current) return;
        const params = new URLSearchParams(searchParams.toString());
        if (newValue) {
            params.set(urlKeyRef.current, 'true');
        } else {
            params.delete(urlKeyRef.current);
        }
        const queryString = params.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    }, [router, pathname, searchParams]);

    const open = useCallback(() => {
        setIsOpen(true);
        updateUrl(true);
    }, [updateUrl]);

    const close = useCallback(() => {
        setIsOpen(false);
        updateUrl(false);
    }, [updateUrl]);

    const toggle = useCallback(() => {
        setIsOpen((prev) => {
            const next = !prev;
            updateUrl(next);
            return next;
        });
    }, [updateUrl]);

    return { isOpen, open, close, toggle };
};
