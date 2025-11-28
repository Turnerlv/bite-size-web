'use client';

import React from 'react';
import clsx from 'clsx';

const textAreaSizeClasses = {
    xs: 'text-xs px-2 py-1.5',
    sm: 'text-sm px-3 py-2',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3',
};

const textAreaVariantClasses = {
    outline: 'bg-transparent border border-border',
    subtle: 'bg-gray-a2 border border-gray-a4',
    ghost: 'bg-transparent border border-transparent',
};

// Rounded classes for multi-row by size
const sizeRoundedClasses = {
    xs: 'rounded-[0.75rem]',
    sm: 'rounded-[1rem]',
    md: 'rounded-[1.25rem]',
    lg: 'rounded-[1.625rem]',
};

export const TextArea = React.forwardRef(function TextArea(
    {
        label,
        name,
        id,
        size = 'md',
        variant = 'outline',
        description,
        error,
        disabled,
        className,
        maxLength,
        showCounter = true,
        rows = 4,
        ...rest
    },
    ref
) {
    const textAreaId = id || name;
    const [value, setValue] = React.useState(rest.defaultValue || '');

    // Single row = fully rounded, multiple rows = size-specific radius
    const roundedClass = rows === 1 ? 'rounded-full' : sizeRoundedClasses[size];

    // Only apply height class for single-row textareas
    const heightClass = rows === 1 ? 'h-10' : '';

    const baseFieldClasses =
        `block w-full outline-none transition ` +
        `font-work text-foreground ` +
        `placeholder:text-text-muted ` +
        `focus-visible:custom-focus ` +
        `disabled:bg-gray-a3 disabled:text-text-muted disabled:cursor-not-allowed ` +
        `resize-y ${roundedClass} rounded-br-none ${heightClass}`;

    const errorClasses = error
        ? 'border-error text-error focus-visible:ring-error focus-visible:border-error'
        : '';

    const handleChange = (event) => {
        setValue(event.target.value);
        if (rest.onChange) {
            rest.onChange(event);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label
                    htmlFor={textAreaId}
                    className="text-sm font-medium text-foreground"
                >
                    {label}
                </label>
            )}

            <textarea
                id={textAreaId}
                name={name}
                rows={rows}
                maxLength={maxLength}
                disabled={disabled}
                ref={ref}
                value={value}
                onChange={handleChange}
                className={clsx(
                    baseFieldClasses,
                    textAreaSizeClasses[size],
                    textAreaVariantClasses[variant],
                    errorClasses,
                    className
                )}
                {...rest}
            />

            <div className="flex items-center justify-between gap-2">
                {description && !error && (
                    <p className="text-xs text-text-muted">{description}</p>
                )}

                {error && (
                    <p className="text-xs text-error">
                        {typeof error === 'string' ? error : 'There is an error.'}
                    </p>
                )}

                {showCounter && maxLength && (
                    <p className="ml-auto text-xs text-text-muted">
                        {value.length} / {maxLength}
                    </p>
                )}
            </div>
        </div>
    );
});
