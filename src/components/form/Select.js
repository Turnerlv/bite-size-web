'use client';

import React from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import * as RadixSelect from '@radix-ui/react-select';

const selectSizeClasses = {
    xs: 'h-6 px-2 text-xs',
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-3 text-sm',
    lg: 'h-[52px] px-4 text-base',
};

const selectVariantClasses = {
    outline: 'bg-transparent border border-border',
    subtle: 'bg-gray-a2 border border-gray-a4',
    ghost: 'bg-transparent border border-transparent',
};

export const Select = React.forwardRef(function Select(
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
        placeholder,
        options = [],
        value,
        defaultValue,
        onValueChange,
        onChange, // compatibility shim
        ...rest
    },
    ref
) {
    const selectId = id || name;
    const labelId = label ? `${selectId}-label` : undefined;

    const baseFieldClasses =
        'flex w-full items-center justify-between rounded-full outline-none transition ' +
        'font-work text-foreground ' +
        'placeholder:text-text-muted ' +
        'focus-visible:custom-focus ' +
        'disabled:bg-gray-a3 disabled:text-text-muted disabled:cursor-not-allowed';

    const errorClasses = error
        ? 'border-error text-error focus-visible:ring-error focus-visible:border-error'
        : '';

    const handleValueChange = (nextValue) => {
        if (onValueChange) onValueChange(nextValue);
        if (onChange) {
            // keep your old handleChange('field') pattern working
            onChange({
                target: {
                    name,
                    value: nextValue,
                },
            });
        }
    };

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label
                    id={labelId}
                    htmlFor={selectId}
                    className="text-sm font-medium text-foreground"
                >
                    {label}
                </label>
            )}

            <RadixSelect.Root
                value={value}
                defaultValue={defaultValue}
                onValueChange={handleValueChange}
                disabled={disabled}
                {...rest}
            >
                <RadixSelect.Trigger
                    ref={ref}
                    id={selectId}
                    aria-labelledby={labelId}
                    className={clsx(
                        baseFieldClasses,
                        selectSizeClasses[size],
                        selectVariantClasses[variant],
                        errorClasses,
                        className
                    )}
                >
                    <RadixSelect.Value placeholder={placeholder} />
                    <RadixSelect.Icon className="pointer-events-none text-text-muted">
                        <ChevronDown size={16} />
                    </RadixSelect.Icon>
                </RadixSelect.Trigger>

                <RadixSelect.Portal>
                    <RadixSelect.Content
                        position="popper"
                        sideOffset={6}
                        className={clsx(
                            'z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden',
                            'rounded-3xl border border-border bg-background shadow-xl',
                            'data-[state=open]:animate-in data-[state=closed]:animate-out',
                            'data-[state=open]:fade-in data-[state=closed]:fade-out',
                            'data-[state=open]:slide-in-from-top-1/2 data-[state=closed]:slide-out-to-top-1/2'
                        )}
                    >
                        <RadixSelect.Viewport className="p-1">
                            {options.map((opt) => (
                                <RadixSelect.Item
                                    key={opt.value}
                                    value={opt.value}
                                    disabled={opt.disabled}
                                    className={clsx(
                                        'relative flex cursor-default select-none items-center rounded-full px-3 py-2 text-sm outline-none',
                                        'font-work text-foreground',
                                        'data-[highlighted]:bg-gray-a3 data-[highlighted]:text-foreground',
                                        'data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground',
                                        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
                                    )}
                                >
                                    <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                                </RadixSelect.Item>
                            ))}
                        </RadixSelect.Viewport>
                    </RadixSelect.Content>
                </RadixSelect.Portal>
            </RadixSelect.Root>

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
