'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

/**
 * @param {boolean} initial
 * @param {{ urlKey?: string }} options - If `urlKey` is provided, open state syncs with that query param.
 *   Components using `urlKey` should be wrapped in a Suspense boundary.
 */
export const useDisclosure = (initial = false, options = {}) => {
    const { urlKey } = options;

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isOpen, setIsOpen] = useState(() => {
        if (urlKey && searchParams) {
            return searchParams.has(urlKey);
        }
        return initial;
    });

    // Sync state with back/forward navigation
    useEffect(() => {
        if (urlKey && searchParams) {
            setIsOpen(searchParams.has(urlKey));
        }
    }, [searchParams, urlKey]);

    const updateUrl = useCallback((newValue) => {
        if (!urlKey) return;
        const params = new URLSearchParams(searchParams.toString());
        if (newValue) {
            params.set(urlKey, 'true');
        } else {
            params.delete(urlKey);
        }
        const queryString = params.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    }, [router, pathname, searchParams, urlKey]);

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
