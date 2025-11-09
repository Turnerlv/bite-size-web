import React from 'react';
import './HomeFeaturedBites.css';

const featuredBites = Array.from({ length: 6 });

export default function HomeFeaturedBites() {
    return (
        <section className="home-featured-bites">
            <h2>Featured Bites</h2>
            <div className="carousel">
                {featuredBites.map((_, idx) => (
                    <div className="carousel-item" key={idx}>
                        {/* Placeholder content */}
                        <div className="placeholder">Bite {idx + 1}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}