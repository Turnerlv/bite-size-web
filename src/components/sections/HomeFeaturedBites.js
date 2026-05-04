import React from 'react';
import ProductCard from '../ProductCard';

const featuredBites = [
    {
        heading: 'Event-Driven Webhook Architecture',
        description: 'Resilient async patterns for real-time data pipelines.',
        category: 'Systems',
        imageSrc: '/bite_preview_1.png',
    },
    {
        heading: 'API Design Principles',
        description: 'Versioning, error contracts, and developer-friendly interfaces.',
        category: 'API Design',
        imageSrc: '/bite_preview_2.png',
    },
    {
        heading: 'Full-Stack Auth Flow',
        description: 'Token-based auth from frontend session to backend verification.',
        category: 'Full-Stack',
        imageSrc: '/bite_preview_3.png',
    },
    {
        heading: 'Database Schema Strategy',
        description: 'Normalisation, indexing, and migration patterns that scale.',
        category: 'Databases',
        imageSrc: '/bite_preview_4.png',
    },
    {
        heading: 'CI/CD Pipeline Setup',
        description: 'Automated testing and deployment from commit to production.',
        category: 'DevOps',
        imageSrc: '/bite_preview_5.png',
    },
    {
        heading: 'DX-First SDK Design',
        description: 'Typed, documented client libraries that developers actually enjoy.',
        category: 'Dev Experience',
        imageSrc: '/bite_preview_6.png',
    },
];

export default function HomeFeaturedBites() {
    return (
        <section className="page-padding mx-auto max-w-[1200px] box-border py-20">
            <h2 className="heading-2 mb-8">Featured Architectures</h2>

            <div
                className="
          flex gap-4 overflow-x-auto scrollbar-custom
          snap-x snap-mandatory pb-2
          lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:snap-none
        "
            >
                {featuredBites.slice(0, 4).map((bite, idx) => (
                    <ProductCard
                        key={idx}
                        heading={bite.heading}
                        description={bite.description}
                        category={bite.category}
                        preview={bite.imageSrc}
                        // Uncomment if you add routes later: route={bite.route}

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
