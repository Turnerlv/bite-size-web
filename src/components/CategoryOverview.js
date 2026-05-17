export default function CategoryOverview({ overview, focusAreas }) {
    return (
        <section className="page-padding mx-auto max-w-[1200px] pb-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="flex flex-col gap-4">
                    <h2 className="heading-3">{overview.title}</h2>
                    <div className="flex flex-col gap-1">
                        <p className="heading-5 text-foreground">{overview.lead}</p>
                        <p className="text-sm md:text-base font-work text-text-muted leading-[1.6] max-w-xl">
                            {overview.description}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="heading-3">{focusAreas.title}</h2>
                    <ul className="bite-bullet-list max-w-xl">
                        {focusAreas.items.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}