import Invoices from "@/Components/Invoices";
import Orders from "@/Components/Orders";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import axios from "axios";

export default function Dashboard({ auth }) {
    const handleMessage = async (recepeant) => {
        await axios
            .post("/create-conversations/", {
                recepeant: recepeant,
            })
            .then((res) => {
                router.visit("/message");
            });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="container mx-auto">
                {/* Welcome  */}
                <div className="welcome pb-2 mt-6 border-black border-b-4">
                    <h2 className="text-3xl font-bold">
                        Hello, {auth.user.name}{" "}
                    </h2>
                </div>

                <Invoices />
                <Orders />
                <div className="services mt-12">
                    <Link
                        href="/services"
                        className="bg-black px-6 py-3 text-white"
                    >
                        Get A Service
                    </Link>{" "}
                    or{" "}
                    <span
                        onClick={() => handleMessage(1)}
                        className="bg-black px-6 py-3 text-white cursor-pointer"
                    >
                        Message Now
                    </span>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
