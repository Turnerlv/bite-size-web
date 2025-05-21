import React from 'react';
import clsx from 'clsx';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    icon: Icon,
    iconPosition = 'left',
    ...props
}) => {
    const baseStyles = `
    inline-flex items-center justify-center gap-1
    rounded-full align-text-top
    font-work font-semibold
    focus-visible:custom-focus cursor-pointer
  `;

    const variantStyles = {
        primary: 'bg-primary text-primary-contrast hover:bg-yellow-10',
        secondary: 'bg-secondary text-secondary-contrast hover:bg-gray-12',
        outline: 'bg-transparent inset-ring inset-ring-foreground text-foreground hover:bg-gray-a-3',
        subtle: 'bg-gray-a-3 text-foreground hover:bg-gray-a-5',
        ghost: 'bg-transparent text-foreground hover:bg-gray-a-3',
    };

    const sizePadding = {
        sm: 3,
        md: 4,
        lg: 5,
    };

    const getPaddingClass = () => {
        const paddingMap = {
            sm: {
                default: 'px-3',
                left: 'pl-2 pr-4',
                right: 'pl-4 pr-2',
                only: 'px-1',
            },
            md: {
                default: 'px-4',
                left: 'pl-3 pr-5',
                right: 'pl-5 pr-3',
                only: 'px-2',
            },
            lg: {
                default: 'px-5',
                left: 'pl-5 pr-7',
                right: 'pl-7 pr-5',
                only: 'px-3',
            },
        };

        const group = paddingMap[size] || paddingMap['md'];

        if (!Icon) return group.default;
        return group[iconPosition] || group.default;
    };


    const sizeText = {
        sm: 'text-sm py-1',
        md: 'text-base py-2',
        lg: 'text-lg py-3',
    };

    const iconSize =
        size === 'sm' ? 'w-5.5 h-5.5' :
            size === 'lg' ? 'w-7 h-7' :
                'w-6 h-6'; // default to 'md'


    const className = clsx(
        baseStyles,
        variantStyles[variant],
        sizeText[size],
        getPaddingClass()
    );

    return (
        <button onClick={onClick} className={className} {...props}>
            {Icon && (iconPosition === 'left' || iconPosition === 'only') && (
                <Icon className={clsx(iconSize, 'stroke-[2.5] px-1 py-1')} />
            )}
            {iconPosition !== 'only' && children}
            {Icon && iconPosition === 'right' && (
                <Icon className={clsx(iconSize, 'stroke-[2.5] px-1 py-1')} />
            )}
        </button>
    );
};

export default Button;
