import { useQuery } from "@tanstack/react-query";

const Invoices = () => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ["invoices"],
        queryFn: () =>
            axios.get("/invoices").then((res) => {
                return res.data;
            }),
    });
    return (
        <div className="mx-auto">
            {isLoading ? (
                "Loading" ? (
                    isError
                ) : (
                    "Something went wrong"
                )
            ) : (
                <>
                    <h2 className="my-5 text-2xl font-bold ">Invoice to pay</h2>
                    {
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 w-12">No</th>
                                    <th className="py-2 px-4">Amount</th>
                                    <th className="py-2 px-4 w-48">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((invoice, index) => (
                                    <tr
                                        key={invoice.invoice_id}
                                        className={
                                            index % 2 === 0
                                                ? "bg-gray-100 text-center"
                                                : "bg-white text-center"
                                        }
                                    >
                                        <td className="py-2 px-4">
                                            {index + 1}
                                        </td>
                                        <td className="py-2 px-4">
                                            {invoice.amount_due/100}
                                        </td>
                                        
                                        <td className="py-2 px-4">
                                            {invoice.amount_due ==
                                            invoice.amount_paid ? (
                                                <button className="bg-green-500 px-4 py-1 text-white disabled cursor-auto">
                                                    Paid
                                                </button>
                                            ) : (
                                                <a
                                                    target="_blank"
                                                    className="px-4 py-1 bg-red-500 text-white"
                                                    href={invoice.url}
                                                >
                                                    Pay
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </>
            )}
        </div>
    );
};

export default Invoices;
