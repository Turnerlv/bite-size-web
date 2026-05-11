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
        <nav aria-label="Breadcrumb" className="font-body">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground">
                <li>
                    {pathnames.length === 0 ? (
                        <span className="text-slate-900">{homeLabel}</span>
                    ) : (
                        <Link href="/" className="">
                            {homeLabel}
                        </Link>
                    )}
                </li>

                {crumbs.map(({ to, label, isLast }) => (
                    <React.Fragment key={to}>
                        <li aria-hidden="true">
                            <ChevronRight className="h-4 w-4 text-slate-400" />
                        </li>
                        <li>
                            {isLast ? (
                                <span className="font-medium text-slate-900">{label}</span>
                            ) : (
                                <Link href={to} className="transition hover:text-slate-900">
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