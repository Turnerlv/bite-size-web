import Button from '@/components/Button';
import { Palette, Code2, Layers, GraduationCap } from 'lucide-react';

const services = [
    {
        icon: Palette,
        title: 'Design Systems',
        tagline: 'Tokens to components, start to finish.',
        description:
            'We build scalable design systems that connect your brand to your codebase. From color token architecture and typography scales to full component libraries — documented, versioned, and ready to ship.',
        bullets: [
            'Token architecture & semantic naming',
            'Light / dark mode strategy',
            'Component library (Figma + React)',
            'Contribution guidelines',
        ],
    },
    {
        icon: Code2,
        title: 'Frontend Engineering',
        tagline: 'Pixel-perfect, accessible, performant.',
        description:
            'From interactive prototypes to production-ready UI, we write clean, composable frontend code. We specialize in Next.js, React, and Tailwind — the same stack that powers this site.',
        bullets: [
            'Next.js App Router builds',
            'Accessible component development',
            'Animations & micro-interactions',
            'Performance optimization',
        ],
    },
    {
        icon: Layers,
        title: 'Prototyping & Concepting',
        tagline: 'Move fast, look great, prove the idea.',
        description:
            'Sometimes you need to see it to believe it. We craft high-fidelity interactive prototypes that communicate ideas clearly — whether for stakeholder buy-in, user testing, or just your own sanity.',
        bullets: [
            'Interactive UI prototypes',
            'Motion & animation direction',
            'Feasibility demos',
            'Design–dev handoff packages',
        ],
    },
    {
        icon: GraduationCap,
        title: 'Workshops & Consulting',
        tagline: 'Level up your team, not just your product.',
        description:
            'We run hands-on workshops and advisory sessions for teams looking to strengthen the relationship between design and engineering. No fluff — just practical skills your team will actually use.',
        bullets: [
            'Design-to-code workflow sessions',
            'Tailwind & component system training',
            'Design system audits & recommendations',
            'Embedded advisory (fractional)',
        ],
    },
];

export const metadata = {
    title: 'Services — Bite Size Design',
    description: 'Design systems, frontend engineering, prototyping, and workshops from Bite Size Design.',
};

export default function ServicesPage() {
    return (
        <div>
            {/* Hero */}
            <section className="
                h-screen page-padding mx-auto max-w-[1200px]
                overflow-hidden relative
                flex items-center
                text-foreground
            ">
                <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-20">
                    <h1 className="flex flex-col">
                        <span className="heading-1 text-primary [text-shadow:-2px_-2px_0_var(--color-foreground)] dark:[text-shadow:none]">
                            Build with us.
                        </span>
                        <span className="heading-1">We do the hard bits.</span>
                    </h1>
                    <div className="flex flex-col gap-4 max-w-sm">
                        <p className="font-work text-text-muted">
                            Bite Size Design offers design and frontend services for teams who care about the craft — and the code behind it.
                        </p>
                        <div>
                            <Button as="link" href="#services" variant="primary" size="md">
                                See what we offer
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="py-20 page-padding mx-auto max-w-[1200px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.title}
                                className="flex flex-col gap-4 border border-border p-8 bg-gray-a2"
                            >
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-contrast">
                                    <Icon size={20} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h2 className="heading-4 mb-1">{service.title}</h2>
                                    <p className="text-sm font-roboto text-primary uppercase">{service.tagline}</p>
                                </div>
                                <p className="font-work text-text-muted text-sm">{service.description}</p>
                                <ul className="mt-2 flex flex-col gap-2">
                                    {service.bullets.map((bullet) => (
                                        <li key={bullet} className="flex items-start gap-2 text-sm font-work text-foreground">
                                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 page-padding">
                <div className="mx-auto max-w-[1200px]">
                    <div className="bg-primary px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div className="text-primary-contrast">
                            <h2 className="heading-3 mb-1">Ready to get started?</h2>
                            <p className="font-work text-sm">Tell us what you're building — we'll figure out the rest.</p>
                        </div>
                        <Button as="link" href="/" variant="contrast" size="md">
                            Drop us a line
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
