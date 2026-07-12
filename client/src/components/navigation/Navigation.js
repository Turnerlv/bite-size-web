'use client';

import { useState, useEffect, useRef } from 'react';
import { useDisclosure } from '@/hooks/a11y/useDisclosure';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/config/navigation';
import { NavItem } from './NavItem';
import { MegaMenu } from './MegaMenu';
import DarkToggle from './DarkToggle';
import Link from 'next/link';
import Button from '../Button';
import { Menu, X } from 'lucide-react';
import { useDrawer } from '@/context/DrawerContext';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import CreateAccountForm from '../form/CreateAccountForm';
import LoginForm from '../form/LoginForm';
import AccountMenu from './AccountMenu';

export default function Navigation() {
    const { isOpen, open, close } = useDisclosure(false);
    const { isLoggedIn, user, logout } = useAuth();
    const { showToast } = useNotification();
    const [activeKey, setActiveKey] = useState(null);
    const [openInteraction, setOpenInteraction] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [menu, setMenu] = useState('hidden');

    const triggerRefs = useRef({});
    const closeTimeoutRef = useRef(null);
    const previousOpenKey = useRef(null);

    const { openDrawer } = useDrawer();
    const buttonRef = useRef(null);

    const pathname = usePathname();

    const handleOpen = (key, interaction = 'toggle') => {
        previousOpenKey.current = key;
        setOpenInteraction(interaction);
        setActiveKey(key);
        open();
    };

    const handleClose = () => {
        setActiveKey(null);
        setOpenInteraction(null);
        previousOpenKey.current = null;
        close();
    };

    const handleToggle = (key) => {
        if (previousOpenKey.current === key) {
            handleClose();
        } else {
            handleOpen(key, 'toggle');
        }
    }

    const handleMouseEnter = (key) => {
        if (isMobile) return;
        clearTimeout(closeTimeoutRef.current);
        handleOpen(key, 'hover');
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

    // Helper to open Login
    const openLoginDrawer = (triggerRef) => {
        openDrawer({
            title: 'Login',
            node: <LoginForm isPage={false} onSwitchForm={() => openCreateAccountDrawer(triggerRef)} />,
            triggerEl: triggerRef,
            side: 'bottom',
            urlKey: 'login',
            contentSize: 'small',
        });
    };

    // Helper to open Create Account
    const openCreateAccountDrawer = (triggerRef) => {
        openDrawer({
            title: 'Create account',
            node: <CreateAccountForm isPage={false} onSwitchForm={() => openLoginDrawer(triggerRef)} />,
            triggerEl: triggerRef,
            side: 'bottom',
            urlKey: 'create-account',
            contentSize: 'small',
        });
    };

    const handleLogout = () => {
        logout();
        showToast('Logged out successfully', null, 'success');
    }

    useEffect(() => {
        if (!open || !isMobile) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    const megaMenu = (
        <>
            {NAV_ITEMS.map((nav) => (
                <MegaMenu
                    label={nav.label}
                    key={nav.key}
                    itemKey={nav.key}
                    isOpen={activeKey === nav.key}
                    openInteraction={openInteraction}
                    items={nav.items}
                    triggerRef={{ current: triggerRefs.current[nav.key] }}
                    onClose={handleClose}
                    onMouseEnter={() => handleMouseEnter(nav.key)}
                    onMouseLeave={handleMouseLeave}
                />

            ))}
        </>
    );

    const loginButton = (
        <Button
            ref={buttonRef}
            variant='surface'
            responsive='true'
            onClick={() => openLoginDrawer(buttonRef)}
        >
            Login
        </Button>
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
        <nav className={`
            /* Size */ w-full
            /* Position */ fixed z-40
            /* Layout */ flex flex-col justify-top sm:justify-center
            /* Border */ border-b border-border
            /* Background */ bg-elevated backdrop-blur-md
            /* Spacing */ 
            ${menu === 'flex' && isMobile ? "h-[100vh]" : "h-auto"}`}>
            <div className={`
                /* Size */ w-full max-w-[1200px] h-[100%] sm:h-auto
                /* Layout */ flex flex-col gap-4 py-4 page-padding sm:flex-row sm:items-center
                /* Spacing */ ${isOpen ? "md:pb-0" : "md:pb-4"}
                /* Positioning */ mx-auto
            `}>
                <div className="
                    /* Size */ w-full h-[44px]
                    /* Layout */ flex items-center justify-between
                    /* Transforms & Animation */ translate-y-[-2px] sm:w-fit
                ">
                    <Link href='/' className="
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
                            /* Layout */ flex flex-col justify-items-stretch sm:flex-row sm:items-center
                            /* Spacing */ mt-6 pt-6 gap-3 sm:mt-0 sm:pt-0
                            /* Border */ border-t border-border sm:border-none
                        `}>
                            {(!isLoggedIn && pathname !== '/login' && pathname !== '/create-account') ? loginButton : isLoggedIn ? <AccountMenu name={user.name} logout={handleLogout} isMobile={isMobile} onNavigate={toggleMenu} /> : null}
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