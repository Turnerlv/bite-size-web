import React from 'react';
import ProductCard from '../ProductCard';

const featuredBites = [
    {
        heading: 'Responsive Grid Layout',
        description: 'Adapt screens to any size',
        category: 'CSS',
        imageSrc: '/bite_preview_1.png'
    },
    {
        heading: 'React Hooks Basics',
        description: 'Hook fundamentals and state management',
        category: 'React',
        imageSrc: '/bite_preview_2.png'
    },
    {
        heading: 'JavaScript Arrays',
        description: 'Essential array methods.',
        category: 'JavaScript',
        imageSrc: '/bite_preview_3.png'
    },
    {
        heading: 'Tailwind CSS Tips',
        description: 'Pro tips and tricks for styling with Tailwind CSS utility classes.',
        category: 'CSS',
        imageSrc: '/bite_preview_4.png'
    },
    {
        heading: 'API Integration',
        description: 'Best practices for fetching and managing API data in React.',
        category: 'React',
        imageSrc: '/bite_preview_5.png'
    },
    {
        heading: 'Git Workflow',
        description: 'Streamline your development process with Git best practices.',
        category: 'DevOps',
        imageSrc: '/bite_preview_6.png'
    }
];

export default function HomeFeaturedBites() {
    return (
        <section className="py-20 mx-auto max-w-[1200px] flex flex-col justify-center p-8 box-border page-padding">
            <h2 className="heading-2 mb-8">Featured Bites</h2>
            <div className="flex flex-row gap-4">
                {featuredBites.slice(0, 4).map((bite, idx) => (
                    <ProductCard
                        key={idx}
                        heading={bite.heading}
                        description={bite.description}
                        category={bite.category}
                        preview={bite.imageSrc}
                    />
                ))}
            </div>
        </section>
    );
}
