"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const formatLabel = (segment) =>
    segment
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

export default function Breadcrumbs({ labelMap = {}, homeLabel = "Home" }) {
    const pathname = usePathname();

    const pathnames = pathname.split("/").filter(Boolean);

    const crumbs = pathnames.map((segment, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const label = labelMap[segment] || formatLabel(decodeURIComponent(segment));
        const isLast = index === pathnames.length - 1;

        return { to, label, isLast };
    });

    return (
        <nav aria-label="Breadcrumb" className="font-roboto uppercase tracking-[0.12em]">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] text-text-muted">
                <li>
                    {pathnames.length === 0 ? (
                        <span className="text-foreground">{homeLabel}</span>
                    ) : (
                        <Link href="/" className="transition hover:text-foreground">
                            {homeLabel}
                        </Link>
                    )}
                </li>

                {crumbs.map(({ to, label, isLast }) => (
                    <React.Fragment key={to}>
                        <li aria-hidden="true">
                            <ChevronRight className="h-3.5 w-3.5 text-text-muted" />
                        </li>
                        <li>
                            {isLast ? (
                                <span className="text-foreground">{label}</span>
                            ) : (
                                <Link href={to} className="transition hover:text-foreground">
                                    {label}
                                </Link>
                            )}
                        </li>
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
}