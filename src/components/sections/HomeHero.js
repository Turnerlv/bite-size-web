'use client';

import { useEffect, useRef } from 'react';
import Button from '../Button';
import Link from 'next/link';

export default function Hero() {
    const maskRef = useRef(null);
    const coordsRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const mask = maskRef.current;

        // Check for browser support
        const supportsBackdropFilter =
            CSS.supports('backdrop-filter', 'grayscale(100%)') ||
            CSS.supports('-webkit-backdrop-filter', 'grayscale(100%)');

        if (!supportsBackdropFilter || !mask) return;

        // Reveal the overlay (it starts as hidden for unsupported browsers)
        mask.classList.remove('hidden');

        const updateMask = () => {
            const { x, y } = coordsRef.current;
            const gradient = `radial-gradient(circle at ${x}px ${y}px, transparent 1px, white 75%)`;
            mask.style.webkitMaskImage = gradient;
            mask.style.maskImage = gradient;
            animationFrameRef.current = requestAnimationFrame(updateMask);
        };

        const handleMouseMove = (e) => {
            coordsRef.current = { x: e.clientX, y: e.clientY };
        };

        // Start animation loop
        animationFrameRef.current = requestAnimationFrame(updateMask);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    return (
        <section className="relative h-screen bg-repeat bg-center bg-[image:var(--bg-pattern)] overflow-hidden flex items-center justify-center text-foreground">
            {/* Desaturation Overlay */}
            <div
                ref={maskRef}
                className="pointer-events-none absolute inset-0 z-20 hidden"
                style={{
                    backgroundColor: 'var(--color-mask)',
                    WebkitBackdropFilter: 'grayscale(100%)',
                    backdropFilter: 'grayscale(100%)',
                    WebkitMaskComposite: 'destination-out',
                    maskComposite: 'exclude',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                }}
            />

            {/* Content */}
            <div className="flex flex-col z-30 items-center page-padding">
                <h1 className="mb-4 text-center relative heading-1 text-foreground">
                    Design meets code, one bite at a time.
                </h1>
                <p className="mb-10 text-foreground font-work text-center text-lg text-medium max-w-2xl">
                    A growing playground of smart, interactive UI patterns. Built for curious designers, developers, and creative coders who love the frontend.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/bites">
                        <Button variant='primary' size='lg' >Explore patterns</Button>
                    </Link>
                    <Button variant='outline' size='lg' >Learn about us</Button>
                </div>
            </div>
        </section>
    );
}
