import { Link } from '@inertiajs/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Orders = () => {
    const queryClient = useQueryClient();
    const { isLoading, isError, data } = useQuery({
        queryKey: ['order'],
        queryFn: () =>
            axios.get('/orders').then((res) => {
                return res.data;
            }),
    });
    return (
        <div>
            <h2 className="text-2xl font-bold mt-4">Total Order {data?.length}</h2>
            {
                isLoading ? "Loading" : isError ? "Something went wrong" : <>
                    <table className='mt-5'>
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4">No</th>
                                <th className="py-2 px-4">Title</th>
                                <th className="py-2 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((order, index) =>
                                <tr key={order.id} className={(index % 2 === 0) ? "bg-gray-100" : "bg-white"}>
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{order.service.title}</td>
                                    <td className="py-2 px-4">{order.status}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </>
            }

        </div>
    );
};

export default Orders;