'use client';

import { useState, useEffect } from 'react';
import NavItem from './NavItem'
import { NavItemExpand } from './NavItemExpand';
import DarkToggle from './DarkToggle';
import Link from 'next/link'
import Button from '../Button'
import { Heart, Menu } from 'lucide-react';

export default function Navigation() {
    const [menu, setMenu] = useState('hidden');

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
                <div className='w-full sm:w-fit flex h-[40px] justify-between items-center'>
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
                        <li><NavItem href='/about' label='About' /></li>
                        <li><NavItem href='/bites' label='Bites' /></li>
                        <li><NavItemExpand></NavItemExpand></li>
                    </ul>
                    <div className="flex flex-row gap-3">
                        <Button variant='subtle' icon={Heart} iconPosition='right'>Bond</Button>
                        <DarkToggle />
                    </div>
                </div>
            </div>
        </div >
    );
}
