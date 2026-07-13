export const HOME_CONTENT = {
    hero: {
        titleLines: ['Systems built one bite at a time.'],
        description:
            'A growing playground of smart system designs, data flows, and robust API integrations. Built for curious engineers, architects, and creative technologists who care about how it works.',
        ctas: {
            primary: { label: 'Explore bites', href: '/bites' },
            secondary: { label: 'Learn about us', href: '/about' },
        },
    },
    value: {
        title: 'What is Bite Size?',
        description:
            'Bite Size is a consultancy bridging the gap between pixel-perfect design and bulletproof backend systems. We believe the journey of the data and system integrity is the true backbone of great user experiences — and we build to prove it.',
    },
    differentiator: {
        title: 'What makes Bite Size different?',
        tiles: [
            {
                image: '/wallpaper_03.svg',
                padding: 'md:pt-8 md:pl-8',
                title: 'Built for complex states',
                description:
                    "Whether you're designing multi-step flows or architecting distributed systems, Bite Size is a space for exploring the how behind resilient, production-ready interfaces.",
            },
            {
                image: '/wallpaper_25.svg',
                padding: 'm-0 md:p-4 lg:p-0 lg:-mt-6 lg:-ml-6',
                title: 'Data integrity over surface polish',
                description:
                    'We share the full stack — data contracts, API design, and state management — because the journey of the data is what makes or breaks the experience.',
            },
            {
                image: '/wallpaper_18.svg',
                padding: 'md:pt-8 md:pl-8',
                title: 'Real architecture, not just whiteboards',
                description:
                    'Every bite is a working proof-of-concept grounded in real system constraints. Built to demonstrate feasibility, not just possibility.',
            },
            {
                image: '/wallpaper_08.svg',
                padding: 'md:p-4',
                title: 'Where the frontend meets the backend',
                description:
                    'Bite Size bridges the gap between product vision and engineering execution — less handoff friction, more end-to-end ownership.',
            },
        ],
    },
    featuredBites: {
        title: 'Featured Architectures',
        bitesRaw: [
            {
                heading: 'Event-Driven Webhook Architecture',
                description: 'Resilient async patterns for real-time data pipelines.',
                category: 'Systems',
                preview: '/bite_preview_1.png',
            },
            {
                heading: 'API Design Principles',
                description: 'Versioning, error contracts, and developer-friendly interfaces.',
                category: 'API Design',
                preview: '/bite_preview_2.png',
            },
            {
                heading: 'Full-Stack Auth Flow',
                description: 'Token-based auth from frontend session to backend verification.',
                category: 'Full-Stack',
                preview: '/bite_preview_3.png',
            },
            {
                heading: 'Database Schema Strategy',
                description: 'Normalisation, indexing, and migration patterns that scale.',
                category: 'Databases',
                preview: '/bite_preview_4.png',
            },
        ],
        get bites() {
            return this.bitesRaw.map(bite => ({
                ...bite,
                slug: bite.heading.trim().toLowerCase().replace(/\s+/g, '-')
            }));
        },
    },
    contact: {
        title: 'Ready to bite the bullet on technical debt?',
        description: "Get professionals to design systems that actually scale. We don't bite... much.",
        ctas: {
            primary: { label: 'Drop us a line' },
            secondary: { label: 'Read our latest briefs', href: '/briefs' },
        },
    },
};

export const ABOUT_CONTENT = {
    story: {
        hero: {
            titleLines: ['Playful on the surface.', 'Bulletproof underneath.'],
            intro: [
                "Yes, we publish fun architecture 'bites' for the community.",
                'Yes, our logo is a pair of chattering teeth.',
                "But we're dead serious about system integrity.",
            ],
        },
        title: 'Our story',
        paragraphs: [
            'Bite Size Design started as a creative lab, but its roots run a decade deep. After 10 years designing complex platforms at IBM, Cigna/Evernorth, BigCommerce, and Airwallex, a harsh reality became clear: a polished interface means nothing if the system behind it is brittle. Traditional UX is only a starting point; the true catalyst for a seamless user experience is the uncompromising integrity of the data model and the architecture beneath it.',
            'We are entering an era where this distinction matters more than ever. With the rapid rise of AI, "vibe-coding," and fragile apps built on generated slop code, the industry desperately needs a new breed of technologist. It requires builders who think holistically — architecting from the API response all the way to the end user\'s screen — ensuring that the entire product ecosystem is resilient by default.',
            'Our goal is to bring radical transparency to how these systems actually work. By exposing the invisible logic and treating the backend architecture as the ultimate user experience, we want to inspire a new standard of products: built transparently, designed deeply, and engineered to last.',
        ],
        quote:
            'A polished UI is just the handshake. True user experience is defined by the integrity, resilience, and logic of the system beneath it.',
    },
    values: {
        title: 'Our values',
        items: [
            {
                title: 'We Design for the Data',
                description:
                    'A pretty component is useless if the webhook fails. We map the journey of the data first, ensuring every state is handled and every edge case is bulletproof.',
            },
            {
                title: 'We Bridge the Gap',
                description:
                    "The best products are built when designers understand the backend, and engineers care about the interface. We reduce the friction between 'design' and 'done'.",
            },
            {
                title: 'We Build for Scale',
                description:
                    'Systems, architectures, and interactions are crafted to survive the real world. We think in resilient patterns, helping teams scale without compounding technical debt.',
            },
            {
                title: 'We Care About the Details',
                description:
                    "From actionable error logs to precise state management, the invisible details shape the whole experience. We obsess over the logic so the user doesn't have to.",
            },
        ],
    },
    founder: {
        title: 'Behind the teeth',
        name: 'Turner Vickery',
        bio: [
            'Bite Size Design is led by Turner Vickery, a long-time creative now based in Singapore. His move to the Red Dot was more than a career pivot; it was a life-defining choice made alongside his Cuban wife and stepdaughter. After years of navigating the complexities of international borders to keep his family together, Turner chose Singapore as the foundation for their future and his next professional chapter.',
            'That relentless drive to make things work — at any cost — is what fuels the studio today. Turner is currently focused on leveling up, moving beyond the surface of design to master the deep system architecture and data integrity he\'s always championed. He is building the studio and the systems he wants for himself: anchored in personal resilience, technical rigor, and the belief that a product is only as good as the logic beneath it.',
        ],
    },
};

const PLACEHOLDER_BODY = [
    {
        type: 'paragraph',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. The integrity of a system is not measured by its happy path — it is measured by how gracefully it handles every other path.',
    },
    {
        type: 'subheading',
        content: 'Consectetur adipiscing elit',
    },
    {
        type: 'paragraph',
        content:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    },
    {
        type: 'orderedList',
        items: [
            'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.',
            'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
            'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
            'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.',
        ],
    },
    {
        type: 'paragraph',
        content:
            'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    },
    {
        type: 'subheading',
        content: 'Nemo enim ipsam voluptatem',
    },
    {
        type: 'paragraph',
        content:
            'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        type: 'labeledList',
        items: [
            {
                label: 'Schema-first thinking',
                content:
                    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nam libero tempore eligendi optio cumque nihil impedit.',
            },
            {
                label: 'Resilient contracts by default',
                content:
                    'Quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
            },
        ],
    },
    {
        type: 'paragraph',
        content:
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis molestie pretium placerat, arcu ante blandit diam, quis pellentesque lorem ante sit amet risus.',
    },
    {
        type: 'unorderedList',
        items: [
            'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.',
            'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
            'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
            'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.',
        ],
    },
    {
        type: 'paragraph',
        content:
            'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    },
];

export const BLOG_CONTENT = {
    hero: {
        titleLines: ['We blabber.', 'About systems.'],
        description: [
            'Opinions, data flows, and explainers.',
            'From the messy middle of frontend and backend.',
        ]
    },
    posts: [
        {
            slug: 'data-integrity-best-ux',
            title: 'Why data integrity is the best UX',
            excerpt:
                'The most impactful user experience improvements often happen in the data layer — not the UI. Here is why integrity is the real design work.',
            category: 'Architecture',
            author: 'Turner Vickery',
            date: 'April 14, 2026',
            readTime: '6 min read',
            body: PLACEHOLDER_BODY,
        },
        {
            slug: 'robust-webhooks-nextjs',
            title: 'Building robust webhooks in Next.js',
            excerpt:
                'Idempotency, signature verification, retry queues, and dead-letter handling — the full picture for production-grade webhook endpoints.',
            category: 'Integrations',
            author: 'Turner Vickery',
            date: 'March 28, 2026',
            readTime: '8 min read',
            body: PLACEHOLDER_BODY,
        },
        {
            slug: 'error-states-that-dont-suck',
            title: "Error states that don't suck",
            excerpt:
                'Actionable, human-readable error messages are a developer experience problem as much as a UX problem. Here is how to design both at once.',
            category: 'Dev Experience',
            author: 'Turner Vickery',
            date: 'March 10, 2026',
            readTime: '5 min read',
            body: PLACEHOLDER_BODY,
        },
        {
            slug: 'event-driven-patterns-fintech',
            title: 'Event-driven patterns for fintech',
            excerpt:
                'How event sourcing, CQRS, and async messaging patterns map to real fintech use cases — and when simpler request-response is the right call.',
            category: 'Systems',
            author: 'Turner Vickery',
            date: 'February 20, 2026',
            readTime: '7 min read',
            body: PLACEHOLDER_BODY,
        },
    ],
};

export const BITES_CONTENT = {
    hero: {
        title: 'One byte at a time.',
        description:
            'A growing library of system architectures, API patterns, and deep-dive technical experiments — built to show how resilient backends and thoughtful interfaces work together.',
    },
    featured: {
        title: 'Featured Architectures',
        cta: { label: 'Browse all →', href: '/bites/categories' },
        items: [
            {
                heading: 'Responsive Grid Layout',
                description: 'Adapt screens to any size',
                category: 'CSS',
                preview: '/bite_preview_1.png',
            },
            {
                heading: 'React Hooks Basics',
                description: 'Hook fundamentals and state management',
                category: 'React',
                preview: '/bite_preview_2.png',
            },
            {
                heading: 'JavaScript Arrays',
                description: 'Essential array methods.',
                category: 'JavaScript',
                preview: '/bite_preview_3.png',
            },
            {
                heading: 'Tailwind CSS Tips',
                description: 'Pro tips and tricks for styling with Tailwind CSS utility classes.',
                category: 'CSS',
                preview: '/bite_preview_4.png',
            },
        ],
    },
};

export const ARCHITECTURE_CONTENT = {
    hero: {
        title: 'Architecture',
        breadcrumbs: {
            homeLabel: 'Home',
            labelMap: {
                bites: 'Bites',
                architecture: 'Architecture',
            },
        },
    },
    overview: {
        title: 'Overview',
        lead: 'Foundational principles for scalable, resilient systems.',
        description:
            "System design isn't just about handling traffic; it's about handling state, failure, and logic predictably. This collection focuses on the structural decisions that prevent technical debt before the first line of UI code is even written.",
    },
    focusAreas: {
        title: 'Focus areas',
        items: [
            'Schema evolution and zero-downtime database migrations.',
            'Event-driven architecture and asynchronous data flows.',
            'Idempotency strategies for financial-grade transactions.',
        ],
    },
};

export const EMPTY_STATE_CONTENT = {
    title: 'No bites in this category yet',
    description:
        'Currently architecting new patterns in the lab. Check back soon for more insights.',
    cta: {
        label: 'Browse all bites',
        href: '/bites/',
    },
};

export const INTEGRATIONS_CONTENT = {
    hero: {
        title: 'Integrations',
        breadcrumbs: {
            homeLabel: 'Home',
            labelMap: {
                bites: 'Bites',
                integrations: 'Integrations',
            },
        },
    },
    overview: {
        title: 'Overview',
        lead: 'Connecting the hard bits reliably.',
        description:
            'Modern products are rarely standalone; they are ecosystems. The true test of a system\'s integrity is how it behaves when it has to talk to external services. This section deconstructs webhooks, APIs, and the connective tissue of the modern web.',
    },
    focusAreas: {
        title: 'Concepts in the Lab',
        items: [
            'Webhook failure recovery and automated retry logic.',
            'Synchronizing application state across third-party services.',
            'Designing resilient API contracts and gateway rate-limiting.',
        ],
    },
};

export const DEVELOPER_EXPERIENCE_CONTENT = {
    hero: {
        title: 'Developer Experience',
        breadcrumbs: {
            homeLabel: 'Home',
            labelMap: {
                bites: 'Bites',
                dx: 'Developer Experience',
            },
        },
    },
    overview: {
        title: 'Overview',
        lead: 'Patterns and tools built for the humans maintaining the code.',
        description:
            'A robust backend is practically useless if the product team hates consuming it. Great DX is the bridge between complex system architecture and intuitive frontend implementation.',
    },
    focusAreas: {
        title: 'Concepts in the Lab',
        items: [
            'Bridging latency with optimistic vs. pessimistic UI rendering.',
            'Enforcing end-to-end type safety from the database to the DOM.',
            'Designing actionable error boundaries and graceful degradation.',
        ],
    },
};

export const TECHNOLOGY_CONTENT = {
    hero: {
        title: 'Technology',
        breadcrumbs: {
            homeLabel: 'Home',
            labelMap: {
                bites: 'Bites',
                technology: 'Technology',
            },
        },
    },
    overview: {
        title: 'Overview',
        lead: 'Standards and tools that power high-integrity systems.',
        description:
            'A system is only as strong as its weakest dependency. We select technologies that prioritize performance, type safety, and long-term maintainability. This collection is a deep dive into the modern stack through a Staff-level lens.',
    },
    focusAreas: {
        title: 'Concepts in the Lab',
        items: [
            'React Server Components and edge-runtime performance.',
            'End-to-end type safety from the database to the DOM.',
            'Schema-first development with Prisma and Drizzle.',
        ],
    },
};

