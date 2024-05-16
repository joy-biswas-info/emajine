import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";

const AnonimusInvoices = (auth) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ["admin/invoices"],
        queryFn: () =>
            axios.get("/admin/all-anonimus-invoice").then((res) => {
                return res.data;
            }),
    });

    const mutation = useMutation({
        mutationFn: (id) => {
            return axios.delete(`/admin/delete/anonimus-invoice/${id}`);
        },
        onSuccess: () => QueryClient.invalidateQueries(["admin/invoices"])
        ,
    });

    const handleDelete = (id) => {
        mutation.mutate(id);
    };


    return (
        <AdminLayout admin={auth.user}>
            <Head title="Invoices"/>
            <div className=" mx-auto">
                {isLoading ? (
                    "Loading" ? (
                        isError
                    ) : (
                        "Something went wrong"
                    )
                ) : (
                    <>
                        <h2 className="mt-5 text-2xl font-bold">Invoices</h2>
                        {
                            <table className="w-full mt-4">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4">No</th>
                                        <th className="py-2 px-4">
                                            Amount Due
                                        </th>
                                        <th className="py-2 px-4">Status</th>
                                        <th className="py-2 px-4">Action</th>
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
                                                {invoice.amount_due / 100}
                                            </td>
                                            <td className="py-2 px-4">
                                                {invoice.status}
                                            </td>
                                            <td className="py-2 px-4">
                                                <button
                                                    className="btn bg-red-500 text-white"
                                                    onClick={() =>
                                                        handleDelete(
                                                            invoice.id
                                                        )
                                                    }
                                                >
                                                    Delete{" "}
                                                    <FaTrash className="text-white" />{" "}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </>
                )}
            </div>
        </AdminLayout>
    );
};

export default AnonimusInvoices;
