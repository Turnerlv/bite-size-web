'use client';

import { useEffect, useState } from 'react';
import Button from "./Button";
import { Moon, SunMedium } from 'lucide-react';

export default function DarkToggle() {
    // Initialize the theme state
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <Button variant="ghost" icon={theme === 'light' ? SunMedium : Moon} onClick={toggleTheme}></Button>
    );
}
