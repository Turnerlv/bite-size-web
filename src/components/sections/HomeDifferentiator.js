import React from 'react';
import Tile from '../MarketingTile';

const HomeDifferentiator = () => {
    return (
        <section className="flex flex-col items-center justify-center py-20 box-border">
            <h2 className="heading-2 mb-8">What makes Bite Size Design different?</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 lg:gap-8 max-w-[1200px] w-full page-padding">
                <Tile image="/wallpaper_03.svg" padding="md:pt-8 md:pl-8" title="Built for complex states" description="Whether you're designing multi-step flows or architecting distributed systems, Bite Size is a space for exploring the how behind resilient, production-ready interfaces." />
                <Tile image="/wallpaper_25.svg" padding="m-0 md:p-4 lg:p-0 lg:-mt-6 lg:-ml-6" title="Data integrity over surface polish" description="We share the full stack — data contracts, API design, and state management — because the journey of the data is what makes or breaks the experience." />
                <Tile image="/wallpaper_18.svg" padding="md:pt-8 md:pl-8" title="Real architecture, not just whiteboards" description="Every bite is a working proof-of-concept grounded in real system constraints. Built to demonstrate feasibility, not just possibility." />
                <Tile image="/wallpaper_08.svg" padding="md:p-4" title="Where the frontend meets the backend" description="Bite Size bridges the gap between product vision and engineering execution — less handoff friction, more end-to-end ownership." />
            </div>
        </section>
    );
};

export default HomeDifferentiator;
