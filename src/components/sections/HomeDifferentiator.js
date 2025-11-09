import React from 'react';
import Tile from '../Tile';

const HomeDifferentiator = () => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-8 box-border page-padding">
            <h2 className="heading-2 mb-8">What makes Bite Size Design different?</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 lg:gap-8 max-w-[1200px] w-full">
                <Tile image="/wallpaper_03.svg" padding="md:pt-8 md:pl-8" title="Built for curious minds" description="Whether you' re a designer learning to code or a developer rethinking UX, Bite Size is a space for exploring the “how” behind great interfaces—one pattern at a time." />
                <Tile image="/wallpaper_25.svg" padding="m-0 md:p-4 lg:p-0 lg:-mt-6 lg:-ml-6" title="Process over polish" description="We share the messy middle—design decisions, dev tradeoffs, and everything in between—because building better products starts with better understanding." />
                <Tile image="/wallpaper_18.svg" padding="md:pt-8 md:pl-8" title="Real patterns, not just pretty pixels" description="Every bite is interactive, reusable, and grounded in real frontend constraints. Built to scale, adapt, and inspire." />
                <Tile image="/wallpaper_08.svg" padding="md:p-4" title="Where design and development meet" description="Bite Size bridges the gap between visual design and engineering logic—less handoff, more handshake." />
            </div>
        </section>
    );
};

export default HomeDifferentiator;