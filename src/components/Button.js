import React from 'react';
import clsx from 'clsx';

const Button = ({
    children,
    variant = 'primary',
    onClick,
    icon: Icon, // Accepts a React component
    iconPosition = 'left',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center gap-2 py-2 rounded-full align-text-top font-work text-base font-medium focus:outline-none cursor-pointer';

    const variantStyles = {
        primary: 'bg-primary text-primary-contrast hover:bg-yellow-10',
        secondary: 'bg-transparent border border-foreground text-foreground hover:bg-gray-9',
        subtle: 'bg-gray-a-3 text-foreground hover:bg-gray-a-5',
        ghost: 'bg-transparent text-foreground hover:bg-gray-a-3',
    };

    const iconSpacing = {
        left: 'pr-6 pl-4',
        right: 'pr-4 pl-6',
        only: 'px-2'
    }

    const className = clsx(baseStyles, variantStyles[variant], iconSpacing[iconPosition]);

    return (
        <button onClick={onClick} className={className} {...props}>
            {Icon && (iconPosition === 'left' || iconPosition === 'only') && (<Icon className='w-6 h-6 px-1 py-1' />)}
            {children}
            {Icon && iconPosition === 'right' && <Icon className='w-6 h-6 px-1 py-1' />}
        </button>
    );
};

export default Button;
