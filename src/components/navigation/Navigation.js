'use client';

import { useState, useEffect, useRef } from 'react';
import { useDisclosure } from '@/hooks/a11y/useDisclosure';
import { NAV_ITEMS } from '@/config/navigation';
import { NavItem } from './NavItem';
import { MegaMenu } from './MegaMenu';
import DarkToggle from './DarkToggle';
import Link from 'next/link';
import Button from '../Button';
import { Heart, Menu, X } from 'lucide-react';

export default function Navigation() {
    const { isOpen, open, close } = useDisclosure(false);
    const [activeKey, setActiveKey] = useState(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [isMobile, setIsMobile] = useState(false);
    const [menu, setMenu] = useState('hidden');

    const triggerRefs = useRef({});
    const closeTimeoutRef = useRef(null);
    const previousOpenKey = useRef(null);


    const handleOpen = (key) => {
        previousOpenKey.current = key;
        setActiveKey(key);
        setFocusedIndex(0);
        open();
    };

    const handleClose = () => {
        setActiveKey(null);
        setFocusedIndex(-1);
        close();
    };

    const handleToggle = (key) => {
        if (previousOpenKey.current === key) {
            console.log("Closed by click")
            previousOpenKey.current = null;
            handleClose();
        } else {
            handleOpen(key);
            console.log("Opened by click")
        }
    }

    // const handleBlur = () => {
    //     previousOpenKey.current = null;
    //     console.log("Lost focus")
    // }

    const handleMouseEnter = (key) => {
        if (isMobile) return;
        clearTimeout(closeTimeoutRef.current);
        handleOpen(key);
    };

    const handleMouseLeave = () => {
        if (isMobile) return;
        closeTimeoutRef.current = setTimeout(() => {
            handleClose();
        }, 100);
        previousOpenKey.current = null;
    };

    const toggleMenu = () => {
        setMenu((prevMenu) => (prevMenu === 'hidden' ? 'flex' : 'hidden'));
    };

    useEffect(() => {
        const handleResize = () => {
            const isNowMobile = window.innerWidth < 640;
            setIsMobile(isNowMobile);
            if (!isNowMobile) {
                setMenu('hidden');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // useEffect(() => {
    //     console.log(clickRef)
    // }, [clickRef]);

    return (
        <nav
            className={`
                fixed z-999 w-full 
                ${menu === 'flex' ? 'h-dvh' : 'h-auto'} 
                flex flex-col justify-top sm:justify-center 
                border-b border-border 
                bg-surface backdrop-blur-md
            `}
        >
            <div
                className={`
                    mx-auto w-full max-w-[1200px] 
                    flex flex-col sm:flex-row items-center 
                    gap-4 py-4 px-4 md:px-8 ${isOpen ? 'md:pb-0' : 'md:pb-4'} 
                `}
            >
                <div
                    className='
                        w-full sm:w-fit 
                        flex items-center justify-between 
                        h-[44px] translate-y-[-2px]
                    '
                >
                    <Link href='.' className='focus-visible:custom-focus'>
                        <img
                            aria-hidden
                            className="nav-logo min-w-[115px]"
                            alt="File icon"
                            height={32}
                            width={115}
                        />
                    </Link>
                    <div className="sm:hidden">
                        <Button
                            variant='ghost'
                            icon={menu === 'flex' ? X : Menu}
                            iconPosition='only'
                            onClick={toggleMenu}
                        />
                    </div>
                </div>

                <div
                    className={`
                        ${menu} sm:flex 
                        w-full flex-col sm:flex-row 
                        justify-between
                    `}
                >
                    <ul className='flex flex-col sm:flex-row gap-2'>
                        {NAV_ITEMS.map((nav) => (
                            <NavItem
                                key={nav.key}
                                itemKey={nav.key}
                                label={nav.label}
                                isOpen={activeKey === nav.key}
                                onClick={(e) => handleToggle(nav.key)}
                                ref={(el) => (triggerRefs.current[nav.key] = el)}
                                onMouseEnter={() => handleMouseEnter(nav.key)}
                                onMouseLeave={handleMouseLeave}
                            />
                        ))}
                    </ul>
                    <div className='w-full sm:w-auto flex justify-items-stretch mt-6 pt-6 sm:mt-0 sm:pt-0 gap-3 border-t border-border sm:border-none'>
                        <DarkToggle isMobile={isMobile} />
                        <Button variant='surface' icon={Heart} iconPosition='right' responsive='true'>
                            Bond
                        </Button>
                    </div>
                </div>
            </div>

            {NAV_ITEMS.map((nav) => (
                <MegaMenu
                    label={nav.label}
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
        </nav>
    );
}
