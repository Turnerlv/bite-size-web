import Badge from '@/components/Badge';
import Button from '@/components/Button';
import { GitBranch, Layers, ArrowRightLeft, Database } from 'lucide-react';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';

const sections = [
    {
        badge: 'Event-Driven Patterns',
        title: 'Architecting for async.',
        description:
            'Event-driven systems decouple producers from consumers, enabling resilient, scalable architectures. These bites walk through webhook delivery guarantees, message queues, and dead-letter handling — the building blocks of async-first design.',
        icon: GitBranch,
        items: [
            {
                heading: 'Event-Driven Webhook Architecture',
                subheading: 'Idempotency, retries, and signature verification',
                difficulty: 'Intermediate',
            },
            {
                heading: 'Pub/Sub with Next.js API Routes',
                subheading: 'Fan-out patterns and subscriber management',
                difficulty: 'Advanced',
            },
            {
                heading: 'Dead-Letter Queue Strategy',
                subheading: 'What to do when events fail to deliver',
                difficulty: 'Intermediate',
            },
        ],
    },
    {
        badge: 'Data Flow Integrity',
        title: 'Trusting the data journey.',
        description:
            'The most impactful UX improvements happen in the data layer. These bites cover schema design, validation boundaries, and the patterns that ensure data arrives correct — not just fast.',
        icon: Database,
        items: [
            {
                heading: 'Schema-First API Design',
                subheading: 'Contracts before code',
                difficulty: 'Beginner',
            },
            {
                heading: 'Validation at the Boundary',
                subheading: 'Where to validate, why it matters',
                difficulty: 'Intermediate',
            },
            {
                heading: 'Optimistic UI with Rollback',
                subheading: 'Frontend trust and backend reality',
                difficulty: 'Advanced',
            },
        ],
    },
];

export const metadata = {
    title: 'Architecture — Bites — Bite Size Design',
    description: 'Systems, data flow, and event-driven architecture patterns — built to show how resilient backends power seamless frontends.',
};

export default function ArchitecturePage() {
    return (
        <div>
            {/* Hero */}
            <section className="
                min-h-[40vh] pt-[74px] page-padding mx-auto max-w-[1200px]
                flex items-end pb-12
                text-foreground
            ">
                <Breadcrumbs
                    labelMap={{
                        home: "About",
                        bites: "Our Story",
                        architecture: "Architecture Bites",
                    }}
                />
                <div>
                    <Badge text="Architecture" />
                    <h1 className="heading-1 mt-4">Systems that scale.</h1>
                    <p className="font-work text-text-muted max-w-lg mt-2">
                        Exploring the journey of the data — how robust backends power seamless frontends. From event-driven patterns to data flow integrity, these bites are built for engineers who care about the full stack.
                    </p>
                </div>
            </section>

            {sections.map((section, sIdx) => {
                const Icon = section.icon;
                return (
                    <section
                        key={sIdx}
                        className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-primary text-primary-contrast">
                                <Icon size={16} strokeWidth={1.5} />
                            </div>
                            <Badge text={section.badge} />
                        </div>
                        <h2 className="heading-3 mb-2">{section.title}</h2>
                        <p className="text-sm font-work text-text-muted mb-8 max-w-lg">{section.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {section.items.map((item, iIdx) => (
                                <div
                                    key={iIdx}
                                    className="border border-border p-6 bg-gray-a2 flex flex-col gap-2"
                                >
                                    <Badge
                                        text={item.difficulty}
                                        color={
                                            item.difficulty === 'Beginner'
                                                ? 'bg-yellow-a3'
                                                : item.difficulty === 'Intermediate'
                                                    ? 'bg-yellow-a4'
                                                    : 'bg-yellow-a5'
                                        }
                                    />
                                    <h3 className="heading-5">{item.heading}</h3>
                                    <p className="text-sm font-work text-text-muted">{item.subheading}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            })}

            {/* CTA */}
            <section className="py-16 page-padding mx-auto max-w-[1200px] border-t border-border flex flex-col gap-4">
                <h2 className="heading-3">Need a real architecture review?</h2>
                <p className="text-sm font-work text-text-muted max-w-md">
                    These bites are proofs-of-concept. If you need a production system designed, our Solution Architecture service is the right fit.
                </p>
                <Button href="/about/services" label="See our services" variant="primary" size="md" />
            </section>
        </div>
    );
}
