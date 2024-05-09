import AdminNavLink from '@/Components/AdminNavLink';

const AdminSidebar = () => {
    return (
        <div className="flex flex-col mx-auto py-12 ps-12 border-r-2 min-h-[100vh] bg-gray-800">
            <ul className="menu menu-horizontal">
                <li>
                    <AdminNavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                        className="my-2"
                    >
                        Dashboard
                    </AdminNavLink>
                </li>
                <li>
                    <details>
                        <summary className="text-gray-100 text-normal pl-1">
                            Services
                        </summary>
                        <div className="pl-2">
                            <li className="">
                                <AdminNavLink
                                    href={route("admin.add.services")}
                                    active={route().current(
                                        "admin.add.services"
                                    )}
                                    className="my-2"
                                >
                                    Add Services
                                </AdminNavLink>
                            </li>
                            <li>
                                <AdminNavLink
                                    href={route("admin.all.services")}
                                    active={route().current(
                                        "admin.all.services"
                                    )}
                                    className="my-2"
                                >
                                    All Servicess
                                </AdminNavLink>
                            </li>
                        </div>
                    </details>
                </li>
                <li>
                    <AdminNavLink
                        href={route("admin.all.conversation")}
                        active={route().current("admin.all.conversation")}
                        className="my-2"
                    >
                        All messages
                    </AdminNavLink>
                </li>
                <li>
                    <details>
                        <summary className="text-gray-100 text-normal pl-1">
                            Invoices
                        </summary>
                        <div className="pl-2">
                            <li className="">
                                <AdminNavLink
                                    href={route("admin.invoices")}
                                    active={route().current("admin.invoices")}
                                    className="my-2"
                                >
                                    Send Invoices
                                </AdminNavLink>
                            </li>
                            <li>
                                <AdminNavLink
                                    href={route("admin.all.invoices")}
                                    active={route().current(
                                        "admin.all.invoices"
                                    )}
                                    className="my-2"
                                >
                                    All Invoices
                                </AdminNavLink>
                            </li>
                        </div>
                    </details>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;