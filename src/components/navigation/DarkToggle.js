'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { Moon, SunMedium } from 'lucide-react';

export default function DarkToggle() {
    const [theme, setTheme] = useState(null);

    // Load theme from localStorage on mount
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    // Sync theme to DOM and localStorage
    useEffect(() => {
        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Avoid rendering before theme is set
    if (!theme) return null;

    return (
        <Button
            variant='ghost'
            icon={theme === 'light' ? SunMedium : Moon}
            iconPosition='only'
            onClick={toggleTheme}
        />
    );
}
