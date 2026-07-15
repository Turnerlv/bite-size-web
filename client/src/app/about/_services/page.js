import Button from '@/components/Button';
import { Network, Code2, Compass, Cpu } from 'lucide-react';
import { SERVICES_CONTENT } from '@/content/static';

const iconMap = {
    Network,
    Code2,
    Compass,
    Cpu,
};

export const metadata = {
    title: 'Services — Bite Size Design',
    description: 'Solution architecture, API design, technical strategy, and fractional engineering from Bite Size Design.',
};

export default function ServicesPage() {
    const { hero, services, cta } = SERVICES_CONTENT;

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
                            {hero.titleLines[0]}
                        </span>
                        <span className="heading-1">{hero.titleLines[1]}</span>
                    </h1>
                    <div className="flex flex-col gap-4 max-w-sm">
                        <p className="font-work text-text-muted">
                            {hero.description}
                        </p>
                        <div>
                            <Button as="link" href={hero.cta.href} variant="primary" size="md">
                                {hero.cta.label}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="py-20 page-padding mx-auto max-w-[1200px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service) => {
                        const Icon = iconMap[service.icon];
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
                            <h2 className="heading-3 mb-1">{cta.title}</h2>
                            <p className="font-work text-sm">{cta.description}</p>
                        </div>
                        <Button as="link" href={cta.button.href} variant="contrast" size="md">
                            {cta.button.label}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
