'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItem({ href, label }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`font-[family-name:var(--font-work-sans)] text-lg align-text-top px-4 py-2 rounded hover:text-blue-500 hover:bg-blue-500 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'
                }`}
        >
            {label}
        </Link>
    );
}