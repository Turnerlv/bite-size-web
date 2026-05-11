export const HOME_CONTENT = {
	hero: {
		titleLines: ['Systems built one bite at a time.'],
		description:
			'A growing playground of smart system designs, data flows, and robust API integrations. Built for curious engineers, architects, and creative technologists who care about how it works.',
		ctas: {
			primary: { label: 'Explore bites', href: '/bites' },
			secondary: { label: 'Learn about us', href: '/about/our_story' },
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
		items: [
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
	},
	contact: {
		title: 'Ready to bite the bullet on technical debt?',
		description: "Get professionals to design systems that actually scale. We don't bite... much.",
		ctas: {
			primary: { label: 'Drop us a line' },
			secondary: { label: 'Check out our services', href: '/about/services' },
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

export const SERVICES_CONTENT = {
	hero: {
		titleLines: ['Scale with us.', 'We connect the hard bits.'],
		description:
			'Bite Size Design offers Solution Architecture and technical strategy for teams who care about resilient systems — and the data journey behind them.',
		cta: { label: 'See what we offer', href: '#services' },
	},
	services: [
		{
			icon: 'Network',
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
			icon: 'Code2',
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
			icon: 'Compass',
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
			icon: 'Cpu',
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
	],
	cta: {
		title: 'Ready to get started?',
		description: "Tell us what system you're building — we'll figure out the architecture.",
		button: { label: 'Drop us a line', href: '/' },
	},
};

export const BLOG_CONTENT = {
	hero: {
		titleLines: ['We blabber.', 'About systems.'],
		description:
			'Opinions, data flows, and explainers from the messy middle of frontend and backend.',
	},
	posts: [
		{
			slug: 'data-integrity-best-ux',
			title: 'Why data integrity is the best UX',
			excerpt:
				'The most impactful user experience improvements often happen in the data layer — not the UI. Here is why integrity is the real design work.',
			category: 'Architecture',
			date: 'April 14, 2026',
			readTime: '6 min read',
		},
		{
			slug: 'robust-webhooks-nextjs',
			title: 'Building robust webhooks in Next.js',
			excerpt:
				'Idempotency, signature verification, retry queues, and dead-letter handling — the full picture for production-grade webhook endpoints.',
			category: 'Integrations',
			date: 'March 28, 2026',
			readTime: '8 min read',
		},
		{
			slug: 'error-states-that-dont-suck',
			title: "Error states that don't suck",
			excerpt:
				'Actionable, human-readable error messages are a developer experience problem as much as a UX problem. Here is how to design both at once.',
			category: 'Dev Experience',
			date: 'March 10, 2026',
			readTime: '5 min read',
		},
		{
			slug: 'event-driven-patterns-fintech',
			title: 'Event-driven patterns for fintech',
			excerpt:
				'How event sourcing, CQRS, and async messaging patterns map to real fintech use cases — and when simpler request-response is the right call.',
			category: 'Systems',
			date: 'February 20, 2026',
			readTime: '7 min read',
		},
		{
			slug: 'bridging-design-and-apis',
			title: 'Bridging design and APIs seamlessly',
			excerpt:
				'The contract between frontend and backend should be designed, not discovered. A practical guide to schema-first thinking across the stack.',
			category: 'Tech Strategy',
			date: 'February 3, 2026',
			readTime: '9 min read',
		},
		{
			slug: 'supabase-without-torching-schema',
			title: 'Using Supabase without torching your schema',
			excerpt:
				'Row-level security, migration discipline, and foreign key hygiene — the practices that keep a Supabase project maintainable at scale.',
			category: 'Databases',
			date: 'January 15, 2026',
			readTime: '4 min read',
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

export const CATEGORY_DATA = {
	systems: {
		title: 'Systems',
		overview:
			'Event-driven patterns, distributed architecture, and state management across the stack.',
		concepts: ['Event-driven architecture', 'Distributed systems', 'State orchestration'],
		count: 12,
		color: 'bg-yellow-a4',
	},
	'api-design': {
		title: 'API Design',
		overview:
			'REST, GraphQL, schema-first thinking, and contract-driven development.',
		concepts: ['REST', 'GraphQL', 'Contract-first design'],
		count: 9,
		color: 'bg-gray-a4',
	},
	'full-stack': {
		title: 'Full-Stack',
		overview:
			'End-to-end feature builds connecting frontend to backend with clean data contracts.',
		concepts: ['Frontend-backend integration', 'Session flows', 'Data contracts'],
		count: 7,
		color: 'bg-gray-a3',
	},
	'dev-experience': {
		title: 'Dev Experience',
		overview:
			'Internal tooling, SDK design, error handling, and developer-first API patterns.',
		concepts: ['SDK design', 'Tooling', 'Error ergonomics'],
		count: 5,
		color: 'bg-yellow-a3',
	},
	databases: {
		title: 'Databases',
		overview:
			'Schema design, migration strategy, indexing, and query optimisation.',
		concepts: ['Schema design', 'Migrations', 'Indexing'],
		count: 6,
		color: 'bg-gray-a5',
	},
	integrations: {
		title: 'Integrations',
		overview:
			'Webhooks, third-party APIs, platform connectors, and legacy system wrappers.',
		concepts: ['Webhooks', 'Third-party APIs', 'Connectors'],
		count: 8,
		color: 'bg-yellow-a4',
	},
	security: {
		title: 'Security',
		overview:
			'Auth patterns, input validation, secrets management, and OWASP-aligned practices.',
		concepts: ['Authentication', 'Validation', 'Secrets management'],
		count: 4,
		color: 'bg-gray-a4',
	},
	devops: {
		title: 'DevOps',
		overview:
			'CI/CD pipelines, deployment strategies, environment config, and observability.',
		concepts: ['CI/CD', 'Deployments', 'Observability'],
		count: 3,
		color: 'bg-gray-a3',
	},
};

export const CATEGORIES_CONTENT = {
	hero: {
		badge: 'Categories',
		title: 'Browse by architecture.',
		description:
			"Every bite is tagged by discipline. Find exactly what you're looking for — or discover something new.",
	},
	sections: {
		allCategoriesTitle: 'All Categories',
		featuredTitle: 'Popular across categories',
	},
	featuredByCategory: [
		{
			heading: 'Event-Driven Webhook Architecture',
			description: 'Resilient async patterns for real-time pipelines',
			category: 'Systems',
			preview: '/bite_preview_1.png',
		},
		{
			heading: 'API Design Principles',
			description: 'Versioning, error contracts, and DX',
			category: 'API Design',
			preview: '/bite_preview_2.png',
		},
		{
			heading: 'Full-Stack Auth Flow',
			description: 'Token-based auth across the stack',
			category: 'Full-Stack',
			preview: '/bite_preview_3.png',
		},
		{
			heading: 'Supabase Schema Strategy',
			description: 'RLS, migrations, and foreign key hygiene',
			category: 'Databases',
			preview: '/bite_preview_4.png',
		},
	],
};
