import * as Icons from 'lucide-react';
import React, { forwardRef } from 'react';

const NavItemSecondary = forwardRef(({
    label,
    description,
    href,
    icon,
    ...props
}, ref) => {
    const IconComponent = Icons[icon] || Icons.Circle; // fallback

    return (

        <a
            href={href}
            role="menuitem"
            tabIndex={0}
            ref={ref}
            className={[
                // Spacing
                "p-3 gap-3",
                // Flex & Grid
                "flex flex-row items-start",
                // Radius
                "rounded-xl",
                // Text & Typography
                "font-work",
                // State/ARIA/Data
                "hover:bg-gray-a4 focus-visible:custom-focus"
            ].join(" ")}
            {...props}
        >
            <IconComponent
                className={[
                    // Size
                    "w-8 h-8",
                    // Spacing 
                    "mt-1",
                    // Other / Unknown
                    "icon stroke-[1.25]"
                ].join(" ")}
            />
            <div
                className={[
                    // Flex & Grid
                    "flex flex-col",
                    // Text & Typography
                    "text-sm"
                ].join(" ")}
            >
                <h3
                    className={[
                        // Text & Typography
                        "font-semibold"
                    ].join(" ")}
                >
                    {label}
                </h3>
                <p>{description}</p>
            </div>

        </a>


    )


});

NavItemSecondary.displayName = 'NavItemSecondary';

export default NavItemSecondary;
