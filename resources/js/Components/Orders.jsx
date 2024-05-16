import { useQuery } from '@tanstack/react-query';

const Orders = () => {


    const { isLoading, isError, data } = useQuery({
        queryKey: ['order'],
        queryFn: () =>
            axios.get('/orders').then((res) => {
                return res.data;
            }),
    });


    return (
        <div className="mx-auto">
            {isLoading ? (
                "Loading"
            ) : isError ? (
                "Something went wrong"
            ) : (
                <>
                    {" "}
                    <h2 className="text-2xl font-bold my-4 ">Orders</h2>
                    <table className="mt-5 w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4">No</th>
                                <th className="py-2 px-4">Title</th>
                                <th className="py-2 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((order, index) => (
                                <tr
                                    key={order.id}
                                    className={
                                        index % 2 === 0
                                            ? "bg-gray-100 text-center"
                                            : "bg-white text-center"
                                    }
                                >
                                    <td className="py-4 px-4 w-12">{index + 1}</td>
                                    <td className=" px-4">
                                        {order.service.title}
                                    </td>
                                    <td className="py-2 px-4 w-48">
                                        <p className="bg-green-300 rounded-lg" >
                                            {order.status}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Orders;