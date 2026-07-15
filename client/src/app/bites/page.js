'use client';

import ProductCard from '@/components/ProductCard';
import Search from '@/components/navigation/Search';
import { HOME_CONTENT } from '@/content/static';

export default function BitesPage() {
    const { featuredBites } = HOME_CONTENT;

    return (
        <div className="pt-[74px]">
            <section className="py-16 page-padding mx-auto max-w-[700px]">
                <div className="w-[540px] mx-auto">
                    <h1 className="
                    /* Spacing */
                    mb-4
                    /* Position */
                    relative
                    /* Text & Typography */
                    text-center text-foreground
                    /* Other */
                    heading-2
                ">
                        Browse the bites
                    </h1>
                    <Search />
                </div>
            </section>

            {/* Featured Bites */}
            <section className="py-16 page-padding mx-auto max-w-[1200px]">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="heading-3">Browse bites</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {featuredBites.bites.map((bite, idx) => (
                        <ProductCard
                            key={idx}
                            bite={bite}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}