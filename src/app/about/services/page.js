import Button from '@/components/Button';
import { Network, Code2, Compass, Cpu } from 'lucide-react';

const services = [
    {
        icon: Network,
        title: 'Solution Architecture',
        tagline: 'Systems designed to survive production.',
        description:
            'We design the blueprint before a line of code is written. From event-driven patterns to data flow diagrams, we map out the architecture that makes your product resilient, scalable, and maintainable.',
        bullets: [
            'System design & architecture diagrams',
            'Event-driven & async pattern selection',
            'Data flow and state management strategy',
            'Technology selection & trade-off analysis',
        ],
    },
    {
        icon: Code2,
        title: 'API & Developer Experience',
        tagline: 'APIs that developers actually enjoy using.',
        description:
            'We design and build APIs with the developer as the end user. Schema-first thinking, consistent error contracts, and typed SDKs — so integrating with your platform feels like a feature, not a chore.',
        bullets: [
            'REST & GraphQL API design',
            'Webhook architecture & reliability patterns',
            'SDK & client library development',
            'API documentation & DX audits',
        ],
    },
    {
        icon: Compass,
        title: 'Technical Product Strategy',
        tagline: 'Bridge the gap between vision and execution.',
        description:
            'We work with founders and product leaders to translate business goals into technical roadmaps. No vague tickets — just clear architecture decisions grounded in what your team can actually ship.',
        bullets: [
            'Technical roadmap planning',
            'Build vs. buy analysis',
            'Engineering team enablement',
            'Stakeholder-ready architecture documentation',
        ],
    },
    {
        icon: Cpu,
        title: 'Fractional Platform Engineering',
        tagline: 'Senior engineering capacity, without the overhead.',
        description:
            'Embed a senior engineer into your team on a fractional basis. We contribute directly to your platform — infrastructure, integrations, tooling — while raising the engineering bar across the board.',
        bullets: [
            'Fractional engineering leadership',
            'Platform & infrastructure improvements',
            'Third-party integration builds',
            'Code review & architectural governance',
        ],
    },
];

export const metadata = {
    title: 'Services — Bite Size Design',
    description: 'Solution architecture, API design, technical strategy, and fractional engineering from Bite Size Design.',
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
                            Scale with us.
                        </span>
                        <span className="heading-1">We connect the hard bits.</span>
                    </h1>
                    <div className="flex flex-col gap-4 max-w-sm">
                        <p className="font-work text-text-muted">
                            Bite Size Design offers Solution Architecture and technical strategy for teams who care about resilient systems — and the data journey behind them.
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
                            <p className="font-work text-sm">Tell us what system you're building — we'll figure out the architecture.</p>
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
