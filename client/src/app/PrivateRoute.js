import { getServerSession } from '@/lib/auth';
import { notFound } from 'next/navigation';

export default async function PrivateRoute({ children }) {
    const user = await getServerSession();
    const isAdmin = user?.role === 'admin';

    if (!isAdmin) notFound(); // This will render the 404 page if the user is not an admin

    return children;
}
