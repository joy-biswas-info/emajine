import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ admin, header, children,err,success }) {

    return (
        <div className="min-h-screen bg-gray-100 grid grid-cols-12">
            <div className="col-span-2 h-screen fixed w-48">
                <AdminSidebar />
            </div>
            <main className="col-span-10 mx-auto p-12 ml-48 w-full">
                {success && (
                    <div role="alert" className="alert alert-success">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{success?.data?.message}</span>
                    </div>
                )}

                {err && (
                    <div role="alert" className="alert alert-error">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{err?.message}</span>
                    </div>
                )}
                {children}
                
            </main>
        </div>
    );
}
