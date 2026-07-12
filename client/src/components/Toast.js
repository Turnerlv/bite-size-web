'use client';

import * as RadixToast from '@radix-ui/react-toast';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import clsx from 'clsx';

const variantConfig = {
    default: {
        icon: Info,
        iconClass: 'text-text-muted',
    },
    success: {
        icon: CheckCircle,
        iconClass: 'text-success',
    },
    error: {
        icon: AlertCircle,
        iconClass: 'text-error',
    },
};

export function Toast({ open, onOpenChange, title, description = null, variant = 'default' }) {
    const { icon: Icon, iconClass } = variantConfig[variant] ?? variantConfig.default;

    return (
        <RadixToast.Root
            open={open}
            onOpenChange={onOpenChange}
            aria-live="polite"
            className={clsx(
                'flex items-start gap-3 rounded-2xl border border-border bg-floating px-4 py-3.5 shadow-xl',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=open]:fade-in data-[state=closed]:fade-out',
                'data-[state=open]:slide-in-from-right-4 data-[state=closed]:slide-out-to-right-4',
                'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
                'data-[swipe=end]:animate-out data-[swipe=end]:slide-out-to-right-4',
                'transition-all duration-200 w-[360px] max-w-[calc(100vw-2rem)]'
            )}
        >
            <Icon size={18} className={clsx('mt-0.5 shrink-0', iconClass)} aria-hidden="true" />

            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                {title && (
                    <RadixToast.Title className="font-work font-semibold text-sm text-foreground">
                        {title}
                    </RadixToast.Title>
                )}
                {description && (
                    <RadixToast.Description className="font-work text-sm text-text-muted leading-[1.5]">
                        {description}
                    </RadixToast.Description>
                )}
            </div>

            <RadixToast.Close
                className="shrink-0 rounded-full p-1 text-text-muted hover:text-foreground hover:bg-gray-a3 transition-colors focus-visible:custom-focus cursor-pointer"
                aria-label="Dismiss"
            >
                <X size={14} strokeWidth={1.5} />
            </RadixToast.Close>
        </RadixToast.Root>
    );
}

export function ToastViewport() {
    return (
        <RadixToast.Viewport className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 outline-none" />
    );
}

export const ToastProvider = RadixToast.Provider;
