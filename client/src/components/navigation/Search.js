'use client';

import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { Search as SearchIcon } from 'lucide-react';
import Button from '../Button';

const SEARCH_HISTORY_KEY = 'search-history';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [buttonSize, setButtonSize] = useState('md');
    const formRef = useRef(null);

    useEffect(() => {
        const updateButtonSize = () => {
            const width = window.innerWidth;

            if (width < 640) {
                setButtonSize('sm');
                return;
            }

            if (width > 767) {
                setButtonSize('lg');
                return;
            }

            setButtonSize('md');
        };

        updateButtonSize();
        window.addEventListener('resize', updateButtonSize);

        return () => {
            window.removeEventListener('resize', updateButtonSize);
        };
    }, []);

    const getSearchHistory = () => {
        try {
            const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    };

    const saveSearchHistory = (newQuery) => {
        if (!newQuery.trim()) return;
        try {
            const history = getSearchHistory();
            const updated = [newQuery, ...history.filter((i) => i !== newQuery)].slice(0, 5);
            localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
        } catch { }
    };

    const openWithHistory = (currentQuery) => {
        const history = getSearchHistory();
        const filtered = currentQuery
            ? history.filter((i) => i.toLowerCase().includes(currentQuery.toLowerCase()))
            : history;
        setSuggestions(filtered.slice(0, 5));
        setIsOpen(filtered.length > 0);
    };

    const handleFocus = () => openWithHistory(query);

    const handleBlur = (e) => {
        if (!formRef.current?.contains(e.relatedTarget)) {
            setIsOpen(false);
        }
    };

    const handleChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        openWithHistory(val);
    };

    const submitSearch = (searchQuery) => {
        if (!searchQuery.trim()) return;
        saveSearchHistory(searchQuery);
        if (onSearch) onSearch(searchQuery);
        setQuery('');
        setIsOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitSearch(query);
    };

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            onBlur={handleBlur}
            className="relative w-full"
        >
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Search..."
                    className={clsx(
                        'block w-full rounded-full bg-gray-a2 outline-none transition',
                        'font-work text-foreground placeholder:text-gray-9',
                        'focus-visible:custom-focus',
                        'h-[40px] px-3 pr-9 py-1.5 text-sm',
                        'sm:h-[52px] sm:pr-11',
                        'md:h-[64px] md:px-4 md:pr-14 md:text-base',
                    )}
                />
                <div className="absolute right-1 top-0.5 sm:right-1.5 sm:top-0.75">
                    <Button
                        as="button"
                        type="submit"
                        variant="primary"
                        size={buttonSize}
                        iconPosition="only"
                        icon={SearchIcon}
                        aria-label="Submit search"
                    />
                </div>
            </div>

            {isOpen && suggestions.length > 0 && (
                <div className={clsx(
                    'absolute top-full mt-1.5 w-full overflow-hidden z-50',
                    'rounded-3xl border border-border bg-background shadow-xl',
                )}>
                    <ul className="p-1">
                        {suggestions.map((item, index) => (
                            <li
                                key={index}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    submitSearch(item);
                                }}
                                className={clsx(
                                    'relative flex cursor-default select-none items-center rounded-full px-3 py-2 text-sm outline-none',
                                    'font-work text-foreground',
                                    'hover:bg-gray-a3',
                                )}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    );
};

export default Search;
