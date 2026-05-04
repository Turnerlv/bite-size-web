import Badge from '@/components/Badge';
import Button from '@/components/Button';
import { Plug, ShieldCheck, CreditCard, LayoutTemplate } from 'lucide-react';

const sections = [
    {
        badge: 'Payment Gateways',
        title: 'Money in, confidence out.',
        description:
            'Payment integrations demand more than a working Stripe checkout. These bites cover idempotency keys, webhook verification, refund flows, and the edge cases that trip up production systems.',
        icon: CreditCard,
        items: [
            {
                heading: 'Stripe Checkout Integration',
                subheading: 'Sessions, webhooks, and fulfillment logic',
                difficulty: 'Beginner',
            },
            {
                heading: 'Idempotent Payment Requests',
                subheading: 'Preventing double charges at scale',
                difficulty: 'Intermediate',
            },
            {
                heading: 'Subscription Lifecycle Management',
                subheading: 'Upgrades, downgrades, and cancellation flows',
                difficulty: 'Advanced',
            },
        ],
    },
    {
        badge: 'Legacy Wrappers',
        title: 'Connecting old and new.',
        description:
            'Not every system can be replaced. These bites show how to wrap legacy APIs, translate schemas, and build safe adapters that let modern frontends consume decades-old backends without fear.',
        icon: LayoutTemplate,
        items: [
            {
                heading: 'Adapter Pattern for Legacy APIs',
                subheading: 'Translating old contracts to new shapes',
                difficulty: 'Intermediate',
            },
            {
                heading: 'Rate Limiting Third-Party APIs',
                subheading: 'Backoff strategies and quota management',
                difficulty: 'Intermediate',
            },
            {
                heading: 'Safe Webhook Delivery',
                subheading: 'Signature verification and replay protection',
                difficulty: 'Advanced',
            },
        ],
    },
];

export const metadata = {
    title: 'Integrations — Bites — Bite Size Design',
    description: 'API wrappers, payment gateways, webhooks, and platform connection patterns — safe, resilient, and production-tested.',
};

export default function IntegrationsPage() {
    return (
        <div>
            {/* Hero */}
            <section className="
                min-h-[40vh] pt-[74px] page-padding mx-auto max-w-[1200px]
                flex items-end pb-12
                text-foreground
            ">
                <div>
                    <Badge text="Integrations" />
                    <h1 className="heading-1 mt-4">Connecting the dots.</h1>
                    <p className="font-work text-text-muted max-w-lg mt-2">
                        API wrappers, safe third-party integrations, and platform glue — the connective tissue between your system and the outside world. Every bite here is designed for reliability, not just convenience.
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
                <h2 className="heading-3">Building an integration from scratch?</h2>
                <p className="text-sm font-work text-text-muted max-w-md">
                    These bites cover patterns. If you need a full integration built and maintained, our API & Developer Experience service is the right fit.
                </p>
                <Button href="/about/services" label="See our services" variant="primary" size="md" />
            </section>
        </div>
    );
}
