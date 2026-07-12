import Breadcrumbs from '@/components/navigation/Breadcrumbs';

export default function CategoryHeader({ hero }) {
    return (
        <section
            className="
                min-h-[40vh] pt-[74px] page-padding mx-auto max-w-[1200px]
                flex items-end pb-12
                text-foreground
            "
        >
            <div className="flex w-full flex-col gap-8">
                <Breadcrumbs
                    homeLabel={hero.breadcrumbs.homeLabel}
                    labelMap={hero.breadcrumbs.labelMap}
                />
                <div>
                    <h1 className="heading-1">{hero.title}</h1>
                </div>
            </div>
        </section>
    );
}