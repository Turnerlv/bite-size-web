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
    const baseStyles = 'inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold focus:outline-none cursor-pointer';

    const variantStyles = {
        primary: 'bg-primary text-primary-contrast hover:bg-yellow-10',
        secondary: 'bg-transparent border border-foreground text-foreground hover:bg-gray-9',
        subtle: 'bg-gray-a-3 text-foreground hover:bg-gray-9',
        ghost: 'bg-transparent text-foreground hover:bg-gray-a-3',
    };

    const iconSpacing = {
        left: 'pr-6 pl-5',
        right: 'pr-5 pl-6'
    }

    const className = clsx(baseStyles, variantStyles[variant], iconSpacing[iconPosition]);

    return (
        <button onClick={onClick} className={className} {...props}>
            {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
            {children}
            {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </button>
    );
};

export default Button;
