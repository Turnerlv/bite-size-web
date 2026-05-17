'use client';

import React from 'react';
import Contact from '@/components/sections/Contact';
import { ABOUT_CONTENT } from '@/content/static';

export default function OurStoryPage() {
    const { story, values, founder } = ABOUT_CONTENT;

    return (
        <div>
            {/* Hero */}
            <section className="
                h-screen w-full max-w-[1200px] mx-auto page-padding
                overflow-hidden relative
                flex items-center
                text-foreground
            ">
                <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-6 md:gap-8 lg:gap-20">
                    <h1 className="flex flex-col shrink-0">
                        <span className="heading-1 text-primary [text-shadow:-2px_-2px_0_var(--color-foreground)] dark:[text-shadow:none]">{story.hero.titleLines[0]}</span>
                        <span className="heading-1">{story.hero.titleLines[1]}</span>
                    </h1>
                    <div className="flex flex-col gap-1 md:gap-2 text-text-muted text-left max-w-s">
                        {story.hero.intro.map((line) => (
                            <p key={line}>{line}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="w-full max-w-[1200px] mx-auto py-20 page-padding">
                <div className="flex flex-col md:flex-row gap-12 md:gap-20">
                    <div className="md:w-1/3">
                        <h2 className="heading-3">{story.title}</h2>
                    </div>
                    <div className="md:w-2/3 flex flex-col gap-6">
                        {story.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="large-block">{paragraph}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote */}
            <section className="w-full bg-primary py-16 page-padding">
                <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center text-center gap-2">
                    <span className="heading-2 text-primary-contrast leading-none">&ldquo;</span>
                    <blockquote className="quote text-primary-contrast">
                        {story.quote}
                    </blockquote>
                    <span className="heading-2 text-primary-contrast leading-none">&rdquo;</span>
                </div>
            </section>

            {/* Our Values */}
            <section className="w-full max-w-[1200px] mx-auto py-20 page-padding">
                <div className="flex flex-col md:flex-row gap-12 md:gap-20">
                    <div className="md:w-1/3">
                        <h2 className="heading-3">{values.title}</h2>
                    </div>
                    <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {values.items.map((item) => (
                            <div key={item.title} className="flex flex-col gap-2">
                                <h3 className="heading-5">{item.title}</h3>
                                <p className="text-sm md:text-base text-text-muted">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Behind the teeth */}
            <section className="w-full max-w-[1200px] mx-auto py-20 page-padding">
                <div className="flex flex-col md:flex-row gap-12 md:gap-20">
                    <div className="md:w-1/3">
                        <h2 className="heading-3">{founder.title}</h2>
                    </div>
                    <div className="md:w-2/3 flex flex-col gap-8">
                        <div className="flex flex-col sm:flex-row gap-8">
                            <div className="w-full sm:w-48 shrink-0 aspect-square bg-gray-3 rounded-lg overflow-hidden" />
                            <p className="text-text-muted">{founder.bio[0]}</p>
                        </div>
                        <p className="text-text-muted">{founder.bio[1]}</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <Contact />
        </div>
    );
}
