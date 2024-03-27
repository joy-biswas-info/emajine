import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';

const AllServices = () => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ["Services"],
        queryFn: async () => {
            return axios.get("/all-services").then((res) => {
                return res.data;
            });
        },
    });
    return (
        <AdminLayout>
            <h2 className="text-3xl bold text-gray-700">All Services</h2>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                        
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr className="con-span-2">
                                <td colSpan={3}>Loading...</td>
                            </tr>
                        ) : isError ? (
                            <tr className="con-span-2">
                                <td colSpan={3}>
                                    Something went wrong...
                                </td>
                            </tr>
                        ) : (
                            data.map((service) => (
                                <tr key={service.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img
                                                        src={`/storage/${service.thumb}`}
                                                        alt={service.title}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">
                                                    {service.title}
                                                </div>
                                                <div className="text-sm opacity-50">
                                                    CAD: {service.price}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Published
                                    </td>
                                    <th>
                                        <button className="btn btn-warning btn-xs">
                                            Delete
                                        </button>
                                    </th>
                                    <th>
                                        <button className="btn btn-danger btn-xs">
                                            <Link href={`/admin/edit-service/${service.id}`}>Edit
                                            </Link>
                                            
                                        </button>
                                    </th>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default AllServices;