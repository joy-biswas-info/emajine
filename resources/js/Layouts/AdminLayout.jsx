import { useState } from 'react';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ admin, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <div className="min-h-screen bg-gray-100 grid grid-cols-12">
            <div className="col-span-2">
                <AdminSidebar></AdminSidebar>
            </div>
            <main className="col-span-10 container mx-auto p-12">
                {children}
            </main>
        </div>
    );
}
