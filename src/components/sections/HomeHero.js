'use client';

import { useEffect, useRef } from 'react';
import Button from '../Button';

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
        <section className="
            /* Size */
            h-screen
            /* Layout */
            flex overflow-hidden bg-repeat bg-center bg-[image:var(--bg-pattern)]
            /* Position */
            relative
            /* Flex & Grid */
            items-center justify-center
            /* Text & Typography */
            text-foreground
        ">
            {/* Desaturation Overlay */}
            <div
                ref={maskRef}
                className="
                    /* Position */
                    absolute inset-0 z-20
                    /* Layout */
                    hidden
                    /* Interactivity */
                    pointer-events-none
                "
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
            <div className="
                /* Layout */
                flex flex-col
                /* Position */
                z-30
                /* Flex & Grid */
                items-center
                /* Other */
                page-padding
            ">
                <h1 className="
                    /* Spacing */
                    mb-4
                    /* Position */
                    relative
                    /* Text & Typography */
                    text-center text-foreground
                    /* Other */
                    heading-1
                ">
                    Design meets code, one bite at a time.
                </h1>
                <p className="
                    /* Spacing */
                    mb-10
                    /* Text & Typography */
                    font-work text-center text-lg text-medium text-foreground
                    /* Size */
                    max-w-2xl
                ">
                    A growing playground of smart, interactive UI patterns. Built for curious designers, developers, and creative coders who love the frontend.
                </p>
                <div className="
                    /* Size */
                    w-full max-w-sm
                    /* Layout */
                    flex flex-col sm:flex-row
                    /* Spacing */
                    gap-4
                    /* Flex & Grid */
                    justify-center
                ">
                    <Button as="link" href="/bites" responsive={true} variant='primary' size='lg'>Explore patterns</Button>
                    <Button responsive={true} variant='outline' size='lg' >Learn about us</Button>
                </div>
            </div>
        </section>
    );
}
