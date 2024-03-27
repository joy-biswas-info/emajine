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
        <div>
            {isLoading ? (
                "Loading" ? (
                    isError
                ) : (
                    "Something went wrong"
                )
            ) : (
                <>
                <h2 className="mt-5 text-2xl font-bold">Invoice to pay</h2>
                    {
                        <table>
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4">No</th>
                                    <th className="py-2 px-4">Amount</th>
                                    <th className="py-2 px-4">Paid</th>
                                    <th className="py-2 px-4">Pay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((invoice, index) => (
                                    <tr
                                        key={invoice.invoice_id}
                                        className={
                                            index % 2 === 0
                                                ? "bg-gray-100"
                                                : "bg-white"
                                        }
                                    >
                                        <td className="py-2 px-4">
                                            {index + 1}
                                        </td>
                                        <td className="py-2 px-4">
                                            {invoice.amount_due}
                                        </td>
                                        <td className="py-2 px-4">
                                            {invoice.amount_paid}
                                        </td>
                                        <td className="py-2 px-4">
                                            {invoice.amount_due ==
                                            invoice.amount_paid ? (
                                                <button className="bg-green-500 px-4 py-1 text-white">Paid</button>
                                                
                                            ) : (
                                                
                                                <a target="_blank" className="px-4 py-1 bg-red-500 text-white" href={invoice.url}>Pay</a>
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
