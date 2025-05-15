'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
    const maskRef = useRef(null);


    useEffect(() => {
        const mask = maskRef.current;

        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            if (mask) {
                mask.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent 1px, var(--color-mask) 50%)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className='relative h-screen bg-repeat bg-center bg-[image:var(--bg-pattern)] overflow-hidden flex items-center justify-center text-foreground'>
            <div
                ref={maskRef}
                className='pointer-events-none absolute inset-0 z-20 transition-[background-position] duration-200 ease-linear'
            />
            <div className="flex flex-col z-30 items-center">
                <h1 className='mb-4 text-center relative text-5xl font-bold text-color-foreground font-[family-name:var(--font-rubik)]'>Design meets code, one bite at a time.</h1>
                <p className='mb-12 text-[var(--foreground)] text-center max-w-2xl'>A growing playground of smart, interactive UI patterns. Built for curious designers, developers, and creative coders who love the frontend.</p>
                <div className='flex gap-4 justify-center'>
                    <button className='p-3 rounded-full bg-primary text-primary-contrast font-semibold'>Explore patterns</button>
                    <button className='p-3 rounded-full border-1'>Learn about us</button>
                </div>
            </div>

        </section>
    );
}

