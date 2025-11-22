import React from 'react';
import ProductCard from '../ProductCard';

const featuredBites = [
    {
        heading: 'Responsive Grid Layout',
        description: 'Adapt screens to any size',
        category: 'CSS',
        imageSrc: '/bite_preview_1.png',
    },
    {
        heading: 'React Hooks Basics',
        description: 'Hook fundamentals and state management',
        category: 'React',
        imageSrc: '/bite_preview_2.png',
    },
    {
        heading: 'JavaScript Arrays',
        description: 'Essential array methods.',
        category: 'JavaScript',
        imageSrc: '/bite_preview_3.png',
    },
    {
        heading: 'Tailwind CSS Tips',
        description:
            'Pro tips and tricks for styling with Tailwind CSS utility classes.',
        category: 'CSS',
        imageSrc: '/bite_preview_4.png',
    },
    {
        heading: 'API Integration',
        description: 'Best practices for fetching and managing API data in React.',
        category: 'React',
        imageSrc: '/bite_preview_5.png',
    },
    {
        heading: 'Git Workflow',
        description: 'Streamline your development process with Git best practices.',
        category: 'DevOps',
        imageSrc: '/bite_preview_6.png',
    },
];

export default function HomeFeaturedBites() {
    return (
        <section className="page-padding mx-auto max-w-[1200px] box-border py-20">
            <h2 className="heading-2 mb-8">Featured Bites</h2>

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
