'use client';

import Tabs from '@/components/navigation/Tabs';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }) {
    const { user, isAdmin } = useAuth();
    const router = useRouter();

    const userName = user?.name ? user.name.split(' ')[0] : 'Admin';

    return (
        <main className="pt-[74px] min-h-[80vh] page-padding mx-auto max-w-[1200px] pb-12 text-foreground">
            <div className="min-h-[15vh] flex items-end justify-between pb-8">
                <h1 className="heading-2">{`Welcome, ${userName}`}</h1>
                <Button variant="primary" size="sm" onClick={() => router.push('/admin/briefs/new')}>
                    Add brief
                </Button>
            </div>
            <Tabs
                tabs={[
                    { label: "Profile", href: "/admin/profile" },
                    ...(isAdmin ? [{ label: "Users", href: "/admin/users" }] : []),
                    { label: "Briefs", href: "/admin/briefs" },
                    { label: "Bites", href: "/admin/bites" },
                ]}
            />
            <div className="mt-8">
                {children}
            </div>
        </main>
    );
}