import React from 'react';
import Tile from './MarketingTile';
import { HOME_CONTENT } from '@/content/static';

const HomeDifferentiator = () => {
    const { differentiator } = HOME_CONTENT;

    return (
        <section className="flex flex-col items-center justify-center py-20 box-border">
            <h2 className="heading-2 mb-8">{differentiator.title}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 lg:gap-8 max-w-300 w-full page-padding">
                {differentiator.tiles.map((tile) => (
                    <Tile key={tile.title} image={tile.image} padding={tile.padding} title={tile.title} description={tile.description} />
                ))}
            </div>
        </section>
    );
};

export default HomeDifferentiator;