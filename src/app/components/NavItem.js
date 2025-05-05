'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItem({ href, label }) {
    const pathname = usePathname();
    const isActive = pathname === href;


    return (
        <Link
            href={href}
            className={`font-[family-name:var(--font-work-sans)] text-lg align-text-top px-4 py-2 rounded hover:text-[var(--foreground)] hover:bg-[var(--grey-100)] ${isActive ? 'bg-[var(--grey-100)] text-[var(--foreground)]' : 'bg-transparent text-[var(--grey-500)]'}
                }`}
        >
            {label}
        </Link>
    );
}

