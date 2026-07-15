import { AlertCircle } from 'lucide-react';

export default function Alert({ message }) {
    return (
        <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-error-border bg-error-surface px-3.5 py-3"
        >
            <AlertCircle
                size={16}
                className="mt-px shrink-0 text-error"
                aria-hidden="true"
            />
            <p className="text-sm text-error">{message}</p>
        </div>
    );
}
