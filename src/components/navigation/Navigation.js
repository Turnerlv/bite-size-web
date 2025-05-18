'use client';

import { useState, useEffect } from 'react';
import { NAV_ITEMS } from '@/config/navigation';
import { NavItem } from './NavItem';
import { MegaMenu } from './MegaMenu';
import DarkToggle from './DarkToggle';
import Link from 'next/link'
import Button from '../Button'
import { Heart, Menu } from 'lucide-react';

export default function Navigation() {
    const [activeKey, setActiveKey] = useState(null);
    const [menu, setMenu] = useState('hidden');

    //toggle dark mode  
    const toggleMenu = () => {
        setMenu((prevMenu) => (prevMenu === 'hidden' ? 'flex' : 'hidden'));
    };

    //default menu to close on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenu('hidden');
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={`w-full ${menu === 'flex' ? 'h-dvh' : 'h-auto'} flex justify-center fixed z-999 bg-surface backdrop-blur-xs border-b border-gray-a-4`} >
            <div className='w-full flex flex-col sm:flex-row gap-4 max-w-[1200px] items-center py-4 mx-4 md:mx-8'>
                <div className='w-full sm:w-fit flex h-[44px] justify-between items-center translate-y-[-1px]'>
                    <Link href='.'>
                        <img
                            aria-hidden
                            className='nav-logo min-w-[115px]'
                            alt='File icon'
                            height={32}
                            width={115}
                        />
                    </Link>
                    <div className='sm:hidden'>
                        <Button variant='ghost' icon={Menu} iconPosition='only' onClick={toggleMenu}></Button>
                    </div>
                </div>
                <div className={`${menu} sm:flex w-full flex-col sm:flex-row justify-between`}>
                    <ul className='flex flex-col sm:flex-row sm:gap-2'>
                        {NAV_ITEMS.map((nav) => (
                            <NavItem
                                key={nav.key}
                                itemKey={nav.key}
                                label={nav.label}
                                isActive={activeKey === nav.key}
                                onClick={(key) => setActiveKey(key)}
                                onHover={(key) => setActiveKey(key)}
                            />
                        ))}
                    </ul>
                    <div className="flex flex-row gap-3">
                        <Button variant='subtle' icon={Heart} iconPosition='right'>Bond</Button>
                        <DarkToggle />
                    </div>
                </div>
            </div>
            {NAV_ITEMS.map((nav) => (
                <MegaMenu
                    key={nav.key}
                    itemKey={nav.key}
                    isActive={activeKey === nav.key}
                    items={nav.items}
                />
            ))}
        </div >
    );
}
