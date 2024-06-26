import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Invoice = ({ auth, users }) => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        user_id: "",
        price: "",
        service: "",
        currency: "cad",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const mutation = useMutation({
        mutationFn: (formData) => {
            return axios.post("/admin/create-invoice", formData);
        },
        onSuccess: (res) => {
            setSuccess(res);
        },
        onError: (error) => {
            setError(error);
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <AdminLayout user={auth.user} success={success} err={error}>
            <Head title="Send Invoice" />
            <div className="max-w-5xl  bg-white p-8 mt-10 rounded">
                <h2 className="text-3xl mb-4 text-black font-bold">
                    Send Invoice to Customer
                </h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p className="text-black">Select Service</p>
                        <input
                            type="text"
                            name="service"
                            placeholder="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>

                    <div className="flex gap-2 w-full">
                        <div className="w-1/2">
                            <p htmlFor="parice" className="text-black mt-4">
                                Input the amount
                            </p>{" "}
                            <input
                                type="number"
                                name="price"
                                placeholder="amount"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full"
                            />
                        </div>
                        <div className="w-1/2">
                            <p className="text-black mt-4">
                                Select your currency
                            </p>{" "}
                            <select
                                name="currency"
                                id=""
                                value={formData.currency}
                                onChange={handleChange}
                                className="w-full"
                            >
                                <option value="">Select currency</option>
                                <option value="cad">CAD</option>
                                <option value="usd">USD</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <p className="text-black mt-4">
                            Please Select a user to send invoice
                        </p>{" "}
                        <select
                            name="user_id"
                            id=""
                            onChange={handleChange}
                            value={formData.user_id}
                            className="w-full"
                        >
                            <option value="">Please Select a user</option>
                            {users.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="submit"
                        value="Send Invoice"
                        className="btn btn-primary text-white my-4 w-full"
                    />
                </form>
                <Link
                    href="/admin/anonimus/invoice"
                    className="btn w-full mt-12 btn-warning"
                >
                    Not on portal
                </Link>
            </div>
        </AdminLayout>
    );
};

export default Invoice;
