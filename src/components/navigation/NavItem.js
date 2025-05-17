'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react'


export default function NavItem({ href, label }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <div className={`flex flex-row justify-between gap-2 items-center font-[family-name:var(--font-work-sans) text-lg sm:text-base pl-8 pr-3 sm:pr-4 sm:pl-6 py-2 rounded-full cursor-pointer hover:text-foreground hover:bg-gray-a-3 ${isActive ? 'bg-[var(--grey-100)] text-[var(--foreground)]' : 'bg-transparent text-foreground'}
        }`}>
            <Link href={href}>{label}</Link>
            <ChevronDown className='w-4 h-4' />
        </div>
    );
}

