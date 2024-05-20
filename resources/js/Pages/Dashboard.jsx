import Invoices from "@/Components/Invoices";
import Orders from "@/Components/Orders";
import PrimaryButton from "@/Components/PrimaryButton";
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
            <div className="container mx-auto min-h-screen flex flex-wrap">
                <div className="w-48 mx-auto mt-10 flex flex-col items-center">
                    <img
                        src={`storage/${auth.user.profile_picture}`}
                        alt="profile_picture"
                        className="rounded-full w-28 h-28 object-contain mx-auto bg-white mb-8"
                    />
                    <p className="text-center text-white">{auth.user.name}</p>
                    <p className="text-center text-white">{auth.user.email}</p>
                    <Link href="/profile">
                        <button className="btn btn-warning rounded-none mx-auto mt-4 w-48">
                            Edit Profile <FaTools />{" "}
                        </button>
                    </Link>
                    <div className="my-6 mx-auto max-w-lg">
                        <PrimaryButton
                            onClick={() => handleMessage(1)}
                            className="btn bg-orange-500 rounded-none border-none px-6 py-3 text-white cursor-pointer mx-auto w-48"
                        >
                            Message Now
                        </PrimaryButton>
                    </div>
                </div>
                <div className="mt-8">
                    <Invoices />
                    <Orders />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
