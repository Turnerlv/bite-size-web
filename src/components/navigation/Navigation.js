'use client';

import { useState, useEffect, useRef } from 'react';
import { useDisclosure } from '@/hooks/a11y/useDisclosure';
import { NAV_ITEMS } from '@/config/navigation';
import { NavItem } from './NavItem';
import { MegaMenu } from './MegaMenu';
import DarkToggle from './DarkToggle';
import Link from 'next/link'
import Button from '../Button'
import { Heart, Menu } from 'lucide-react';

export default function Navigation() {
    const { isOpen, open, close } = useDisclosure(false)
    const [isHovering, setIsHovering] = useState(false);
    const [activeKey, setActiveKey] = useState(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [isMobile, setIsMobile] = useState(false);
    const [menu, setMenu] = useState('hidden');

    const triggerRefs = useRef({});
    const closeTimeoutRef = useRef(null);


    const handleOpen = (key) => {
        setActiveKey(key);
        setFocusedIndex(0);
        open();
    };

    const handleClose = () => {
        setActiveKey(null);
        setFocusedIndex(-1);
        close();
    }

    const handleToggle = (key) => {
        if (activeKey === key) {
            handleClose();
        } else {
            handleOpen(key);
        }
    };

    //close on hover
    const handleMouseEnter = (key) => {
        if (isMobile) return;
        clearTimeout(closeTimeoutRef.current);
        setIsHovering(true);
        handleOpen(key);
    };

    const handleMouseLeave = () => {
        if (isMobile) return;
        closeTimeoutRef.current = setTimeout(() => {
            setIsHovering(false);
            handleClose();
        }, 100); // delay to allow moving between menu & trigger
    };



    //toggle mobile menu 
    const toggleMenu = () => {
        setMenu((prevMenu) => (prevMenu === 'hidden' ? 'flex' : 'hidden'));
    };

    //default menu to close on resize
    useEffect(() => {
        const handleResize = () => {
            const isNowMobile = window.innerWidth < 768;
            setIsMobile(isNowMobile);

            // Auto-hide mobile menu when resizing up to desktop
            if (!isNowMobile) {
                setMenu('hidden');
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <nav className={`w-full ${menu === 'flex' ? 'h-dvh' : 'h-auto'} flex flex-col justify-top sm:justify-center fixed z-999 bg-surface backdrop-blur-xs border-b border-gray-a-4`} >
            <div className='w-full flex flex-col sm:flex-row gap-4 max-w-[1200px] items-center py-4 mx-auto px-4 md:px-8'>
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
                                isOpen={activeKey === nav.key}
                                onClick={handleToggle}
                                ref={(el) => (triggerRefs.current[nav.key] = el)}
                                onMouseEnter={() => handleMouseEnter(nav.key)}
                                onMouseLeave={handleMouseLeave}
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
                    isOpen={activeKey === nav.key}
                    items={nav.items}
                    triggerRef={triggerRefs.current[nav.key]}
                    onClose={handleClose}
                    focusedIndex={focusedIndex}
                    setFocusedIndex={setFocusedIndex}
                    onMouseEnter={() => handleMouseEnter(nav.key)}
                    onMouseLeave={handleMouseLeave}
                />
            ))}
        </nav >
    );
}
