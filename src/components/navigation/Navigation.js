'use client';

import { useState, useEffect, useRef } from 'react';
import { useDisclosure } from '@/hooks/a11y/useDisclosure';
import { NAV_ITEMS } from '@/config/navigation';
import { NavItem } from './NavItem';
import { MegaMenu } from './MegaMenu';
import DarkToggle from './DarkToggle';
import Link from 'next/link';
import Button from '../Button';
import { Heart, Menu, X, ChevronLeft } from 'lucide-react';
import { useDrawer } from '@/components/DrawerContext';

export default function Navigation() {
    const { isOpen, open, close } = useDisclosure(false);
    const [activeKey, setActiveKey] = useState(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [isMobile, setIsMobile] = useState(false);
    const [menu, setMenu] = useState('hidden');

    const triggerRefs = useRef({});
    const closeTimeoutRef = useRef(null);
    const previousOpenKey = useRef(null);

    const { openDrawer } = useDrawer();
    const buttonRef = useRef(null);


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
        previousOpenKey.current = null;
    };

    const megaMenu = (
        <>
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
        </>
    );

    useEffect(() => {
        const handleResize = () => {
            const isNowMobile = window.innerWidth < 640;
            setIsMobile(isNowMobile);
            if (!isNowMobile) {
                setMenu('hidden');
                handleClose();
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="
            /* Size */ w-full
            /* Position */ fixed z-40
            /* Layout */ flex flex-col justify-top sm:justify-center
            /* Border */ border-b border-border
            /* Background */ bg-surface backdrop-blur-md
        ">
            <div className={`
                /* Size */ w-full max-w-[1200px]
                /* Layout */ flex flex-col gap-4 py-4 page-padding sm:flex-row sm:items-center
                /* Spacing */ ${isOpen ? "md:pb-0" : "md:pb-4"}
                /* Positioning */ mx-auto
            `}>
                <div className="
                    /* Size */ w-full h-[44px]
                    /* Layout */ flex items-center justify-between
                    /* Transforms & Animation */ translate-y-[-2px] sm:w-fit
                ">
                    <Link href='.' className="
                        /* State/ARIA/Data */ focus-visible:custom-focus
                    ">
                        <img
                            aria-hidden
                            className="
                                /* Size */ min-w-[115px]
                                /* Other */ nav-logo
                            "
                            alt="File icon"
                            height={32}
                            width={115}
                        />
                    </Link>
                    <div className="/* Interactivity */ sm:hidden">
                        <Button
                            variant='ghost'
                            icon={menu === 'flex' ? X : Menu}
                            iconPosition='only'
                            onClick={toggleMenu}
                        />
                    </div>
                </div>
                <div className={`
                    /* Size */ w-full
                    /* Layout */ ${menu} gap-17 flex justify-center sm:flex
                    /* Transforms & Animation */ transition-transform duration-150 ease-out ${isOpen ? "-translate-x-1/2 sm:translate-none" : "translate-none"}
                `}>
                    <div className="
                        /* Size */ w-full
                        /* Layout */ flex flex-shrink-0 flex-col sm:flex-row sm:justify-between
                    ">
                        <ul className="
                            /* Layout */ gap-2 flex flex-col sm:flex-row
                        ">
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
                        <div className={`
                            /* Size */ w-full sm:w-auto
                            /* Layout */ flex flex-col justify-items-stretch sm:flex-row
                            /* Spacing */ mt-6 pt-6 gap-3 sm:mt-0 sm:pt-0
                            /* Border */ border-t border-border sm:border-none
                        `}>
                            <Button
                                variant='surface'
                                icon={Heart}
                                iconPosition='right'
                                responsive='true'
                                onClick={() => openDrawer({ title: 'Bond', node: <div>Bond content</div>, triggerEl: buttonRef.current, side: 'bottom' })}
                            >
                                Bond
                            </Button>
                            <DarkToggle isMobile={isMobile} />
                        </div>
                    </div>
                    {isMobile && megaMenu}
                </div>
            </div>
            {!isMobile && megaMenu}
        </nav>
    );
}