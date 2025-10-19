"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// lottie-react is only loaded on the client
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function AnimatedIllustration({
    jsonPath = "/my-animation.json",   // file in /public
    fallbackSrc = "/my-fallback.png",  // file in /public
    className = "",
    loop = true,
    autoplay = true,
}) {
    const [prefersReduced, setPrefersReduced] = useState(false);
    const [inView, setInView] = useState(false);
    const [animationData, setAnimationData] = useState(null);
    const containerRef = useRef(null);

    // Detect reduced motion
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setPrefersReduced(mq.matches);
        update();
        mq.addEventListener?.("change", update);
        return () => mq.removeEventListener?.("change", update);
    }, []);

    // Lazy load when in view
    useEffect(() => {
        if (!containerRef.current) return;
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { rootMargin: "200px" }
        );
        io.observe(containerRef.current);
        return () => io.disconnect();
    }, []);

    // Fetch JSON (only when needed)
    useEffect(() => {
        if (!inView || prefersReduced) return;
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch(jsonPath, { cache: "force-cache" });
                if (!res.ok) throw new Error("Failed to load Lottie JSON");
                const data = await res.json();
                if (!cancelled) setAnimationData(data);
            } catch (e) {
                // leave animationData null -> fallback image will show
                console.error(e);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [inView, prefersReduced, jsonPath]);



    return (
        <div
            ref={containerRef}
            className={`relative max-w-full aspect-[1/1] md:aspect-[4/3] ${className}`}
        >
            {prefersReduced || !animationData ? (
                <Image
                    src={fallbackSrc}
                    alt="Illustration"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 600px"
                />
            ) : (
                <Lottie
                    animationData={animationData}
                    loop={loop}
                    speed={1}
                    autoplay={autoplay}
                    className="w-full h-full"
                    rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
                />
            )}
        </div>
    );
}
