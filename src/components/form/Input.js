'use client';

import React from 'react';
import clsx from 'clsx';

const inputSizeClasses = {
    xs: 'h-6 px-2 text-xs',
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-3 text-sm',
    lg: 'h-[52px] px-4 text-base',
};

const inputVariantClasses = {
    outline: 'bg-transparent border border-border',
    subtle: 'bg-gray-a2 border border-gray-a4',
    ghost: 'bg-transparent border border-transparent',
};

export const Input = React.forwardRef(function Input(
    {
        label,
        name,
        id,
        type = 'text',
        size = 'md',
        variant = 'outline',
        description,
        error,
        disabled,
        className,
        leftIcon,
        rightIcon,
        ...rest
    },
    ref
) {
    const inputId = id || name;

    const baseFieldClasses =
        'block w-full rounded-full outline-none transition ' +
        'font-work text-foreground ' +
        'placeholder:text-gray-9 ' +
        'focus-visible:custom-focus ' +
        'disabled:bg-gray-a3 disabled:text-text-muted disabled:cursor-not-allowed';

    const errorClasses = error
        ? 'border-error text-error focus-visible:ring-error focus-visible:border-error'
        : '';

    const contentPadding =
        leftIcon || rightIcon ? 'pl-9 pr-9' : '';

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-foreground"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-text-muted">
                        {leftIcon}
                    </span>
                )}

                <input
                    id={inputId}
                    name={name}
                    type={type}
                    disabled={disabled}
                    ref={ref}
                    className={clsx(
                        baseFieldClasses,
                        inputSizeClasses[size],
                        inputVariantClasses[variant],
                        contentPadding,
                        errorClasses,
                        className
                    )}
                    {...rest}
                />

                {rightIcon && (
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-text-muted">
                        {rightIcon}
                    </span>
                )}
            </div>

            {description && !error && (
                <p className="text-xs text-text-muted">{description}</p>
            )}

            {error && (
                <p className="text-xs text-error">
                    {typeof error === 'string' ? error : 'There is an error.'}
                </p>
            )}
        </div>
    );
});
