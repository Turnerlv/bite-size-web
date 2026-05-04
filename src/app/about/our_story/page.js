import React from 'react';

export default function OurStoryPage() {
    return (
        <div className="about-page">
            <section className="            
            /* Size */
            h-screen page-padding mx-auto max-w-[1200px]
            /* Layout */
            overflow-hidden bg-repeat bg-center
            /* Position */
            relative
            /* Flex & Grid */
            flex items-center
            /* Text & Typography */
            text-foreground">
                <div className="w-full flex flex-row items-center justify-between gap-20">
                    <h1 className="flex flex-col">
                        <span className="heading-1 text-primary [text-shadow:-2px_-2px_0_var(--color-foreground)] dark:[text-shadow:none]">Playful on the surface.</span>
                        <span className="heading-1">Bulletproof underneath.</span>
                    </h1>
                    <div className="flex flex-col">
                        <p>Yes, we publish fun architecture 'bites' for the community.</p>
                        <p>Yes, our logo is a pair of chattering teeth.</p>
                        <p>But we're dead serious about system integrity and the journey of your data.</p>
                    </div>
                </div>
            </section>

            <section className="section-mission">
                <h2>Our Mission</h2>
                <p>We are dedicated to delivering excellence in everything we do.</p>
            </section>

            <section className="section-values">
                <h2>Our Values</h2>
                <p>Integrity, innovation, and customer-first thinking guide our decisions.</p>
            </section>

            <section className="section-team">
                <h2>Our Team</h2>
                <p>Meet the talented people behind our success.</p>
            </section>

            <section className="section-contact">
                <h2>Get In Touch</h2>
                <p>Have questions? We'd love to hear from you.</p>
            </section>
        </div>
    );
}