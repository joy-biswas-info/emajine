import Invoices from "@/Components/Invoices";
import Orders from "@/Components/Orders";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import axios from "axios";
import { FaTools } from "react-icons/fa";

export default function Dashboard({ auth }) {
    const handleMessage = async (recepeant) => {
        await axios
            .post("/create-conversations", {
                recepeant: recepeant,
            })
            .then(() => {
                router.visit("/message");
            });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="container mx-auto">
                <div className="w-48 mx-auto mt-10 ">
                    <img
                        src={`storage/${auth.user.profile_picture}`}
                        alt="profile_picture"
                        className="rounded-full w-24 h-24 object-fill mx-auto"
                    />
                    <p className="text-center">{auth.user.name}</p>
                    <Link href="/profile">
                        <button className="btn btn-warning rounded-none mx-auto mt-4 w-48">
                            Edit Profile <FaTools />{" "}
                        </button>
                    </Link>
                    <div className="my-6 mx-auto max-w-lg">
                        <button
                            onClick={() => handleMessage(1)}
                            className="bg-black px-6 py-3 text-white cursor-pointer mx-auto w-48"
                        >
                            Message Now
                        </button>
                    </div>
                </div>

                <Invoices />
                <Orders />
            </div>
        </AuthenticatedLayout>
    );
}
