import NavLink from '@/Components/NavLink';
import React from 'react';

const AdminSidebar = () => {
    return (
        <div className="flex flex-col mx-auto py-12 ps-12 border-r-2 h-screen bg-gray-200">
            <div>
                <NavLink
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                    className="my-2"
                >
                    Dashboard
                </NavLink>
            </div>

            <div>
                <NavLink
                    href={route("admin.add.services")}
                    active={route().current("admin.add.services")}
                    className="my-2"
                >
                    Add Services
                </NavLink>
            </div>
            <div>
                <NavLink
                    href={route("admin.all.services")}
                    active={route().current("admin.all.services")}
                    className="my-2"
                >
                    All Servicess
                </NavLink>
            </div>
            <div>
                <NavLink
                    href={route("admin.all.conversation")}
                    active={route().current("admin.all.conversation")}
                    className="my-2"
                >
                    All messages
                </NavLink>
            </div>
            <div>
                <NavLink
                    href={route("admin.invoices")}
                    active={route().current("admin.invoices")}
                    className="my-2"
                >
                    Send Invoice
                </NavLink>
            </div>
        </div>
    );
};

export default AdminSidebar;