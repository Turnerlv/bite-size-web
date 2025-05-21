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
            className="flex flex-row items-center p-3 rounded-xl gap-3 font-work hover:bg-gray-a-4 focus:custom-focus"
            {...props}
        >
            <IconComponent className="icon stroke-[1.25] w-8 h-8" />
            <div className='flex flex-col text-sm'>
                <h3 className='font-semibold'>{label}</h3>
                <p>{description}</p>
            </div>

        </a>


    )


});

export default NavItemSecondary;
