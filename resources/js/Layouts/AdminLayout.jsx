import { useState } from 'react';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ admin, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <div className="min-h-screen bg-gray-100 grid grid-cols-12">
            <div className="col-span-3 h-screen fixed w-48">
                <AdminSidebar />
            </div>
            <main className="col-span-10 container mx-auto p-12 ml-48">
                {children}
            </main>
        </div>
    );
}
