'use client';

import { useEffect, useState } from 'react';

export default function DarkToggle() {
    // Initialize the theme state
    const [theme, setTheme] = useState('dark');

    // Effect to apply theme when it's changed
    useEffect(() => {
        // Apply theme to <html> element
        document.documentElement.setAttribute('data-theme', theme);

        // Save the theme to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Toggle between dark and light modes
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="App">
            <button onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
        </div>
    );
}
