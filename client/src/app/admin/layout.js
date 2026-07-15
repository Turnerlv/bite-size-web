import ProtectedRoute from '@/app/ProtectedRoute';

export default function AdminLayout({ children }) {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    );
}