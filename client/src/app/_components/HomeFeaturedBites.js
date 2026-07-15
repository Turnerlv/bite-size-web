import React from 'react';
import ProductCard from '@/components/ProductCard';
import { HOME_CONTENT } from '@/content/static';

export default function HomeFeaturedBites() {
    const { featuredBites } = HOME_CONTENT;

    return (
        <section className="page-padding mx-auto max-w-[1200px] box-border py-20">
            <h2 className="heading-2 mb-8">{featuredBites.title}</h2>

            <div
                className="
          flex gap-4 overflow-x-auto scrollbar-custom
          snap-x snap-mandatory pb-2
          lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:snap-none
        "
            >
                {featuredBites.bites.slice(0, 4).map((bite) => (
                    <ProductCard
                        key={bite.slug}
                        id={bite.slug}
                        bite={bite}
                        className="
              snap-start
              shrink-0 basis-[280px] max-w-[280px]
              lg:shrink lg:basis-auto lg:max-w-none lg:w-full
            "
                    />
                ))}
            </div>
        </section>
    );
}