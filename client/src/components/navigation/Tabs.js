'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Tabs({
    tabs = [],
    orientation = 'horizontal',
    ariaLabel = 'Navigation tabs',
    className = '',
}) {
    const pathname = usePathname();
    if (!Array.isArray(tabs) || tabs.length === 0) return null;

    const isVertical = orientation === 'vertical';

    return (
        <div className={`w-full flex-col gap-8 ${className}`.trim()}>
            <div
                aria-label={ariaLabel}
                className={`${isVertical ? 'flex flex-col gap-2' : 'flex flex-wrap gap-2 border-border border-b'}`}
            >
                {tabs.map((tab, index) => {
                    const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);

                    return (
                        <Link
                            key={tab.href || index}
                            href={tab.href}
                            className={`font-work text-base text-text-muted px-4 py-2 border-b-4 transition-colors cursor-pointer hover:bg-gray-a3 focus-visible:custom-focus ${isActive ? 'border-b-primary text-primary' : 'border-b-transparent'
                                }`}
                        >
                            {tab.label}
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
