import React from 'react';
import clsx from 'clsx';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    icon: Icon,
    iconPosition = 'left',
    responsive = 'false',
    ...props
}) => {

    const responsiveFlex = {
        false: 'inline-flex',
        true: 'flex flex-row sm:inline-flex justify-center grow',
    }

    const baseStyles = `
    ${responsiveFlex[responsive]} items-center gap-1
    rounded-full align-text-top
    font-work font-medium
    focus-visible:custom-focus cursor-pointer
  `;


    const variantStyles = {
        primary: 'bg-primary text-primary-contrast hover:bg-yellow-10',
        secondary: 'bg-secondary text-secondary-contrast hover:bg-gray-a-11',
        outline: 'bg-transparent inset-ring inset-ring-foreground text-foreground hover:bg-gray-a-4',
        soft: 'bg-gray-a-3 text-foreground hover:bg-gray-a-5',
        surface: 'bg-gray-a-2 inset-ring inset-ring-gray-a-4 text-foreground hover:bg-gray-a-5',
        ghost: 'bg-transparent text-foreground hover:bg-gray-a-3',
    };

    const sizePadding = {
        xs: 2,
        sm: 3,
        md: 4,
        lg: 5,
    };

    const getPaddingClass = () => {
        const paddingMap = {
            xs: {
                default: 'px-2 py-1',
                left: 'pl-1 pr-3 py-[2px]',
                right: 'pl-3 pr-1 py-[2px]',
                only: 'px-[2px] py-[2px]',
            },
            sm: {
                default: 'px-3 py-1.5',
                left: 'pl-2 pr-4 py-1.25',
                right: 'pl-4 pr-2 py-1.25',
                only: 'px-1.25 py-1.25',
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
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base py-2',
        lg: 'text-lg py-3',
    };

    const iconSize =
        size === 'xs' ? 'w-5 h-5' :
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
                <Icon className={clsx(iconSize, 'stroke-[1.5] px-1 py-1')} />
            )}
            {iconPosition !== 'only' && children}
            {Icon && iconPosition === 'right' && (
                <Icon className={clsx(iconSize, 'stroke-[1.5] px-1 py-1')} />
            )}
        </button>
    );
};

export default Button;
