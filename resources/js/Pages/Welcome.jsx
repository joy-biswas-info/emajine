import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Welcome({auth}) {
    return (
        <div>
            {auth.user ? (
                <Authenticated user={auth.user}>
                    <Head title="Home" />
                    <div className="hero py-12 md:py-48 bg-black">
                        <div className="hero-content flex-col lg:flex-row-reverse content-between">
                            <img
                                src="/logo.png"
                                className="max-w-md rounded-lg shadow-2xl hidden md:block"
                            />
                            <div>
                                <h1 className="text-8xl font-bold text-white">
                                    IDEAS Turned Into Reality
                                </h1>
                                <p className="py-6 max-w-lg text-white">
                                    With every single one of our clients, we
                                    bring forth a deep passion for creative
                                    problem solving — which is what we deliver.
                                </p>
                                <PrimaryButton className="btn btn-primary text-white">
                                    Get Started
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-black flex flex-col items-center py-4">
                        <h1 className="text-8xl text-center text-orange-500 my-2 font-bold">
                            EMAJINE PORTAL
                        </h1>

                        <p className="text-white text-center max-w-3xl mx-auto my-6 py-12">
                            Our self-service web portal allows you to order
                            products online and get support 24 heure /7. My
                            Emagine portal is a secure platform that allows you
                            to view your personal information, progress and
                            updates on your projects, manage your subscriptions
                            and print your invoices.
                        </p>
                    </div>
                    <div className="bg-black pt-4 pb-24">
                        <h1 className="text-8xl text-center text-orange-500 font-bold my-12">
                            Our Popular services
                        </h1>
                        <div className="container mx-auto grid grid-cols-2 gap-8">
                            <img src="/storage/images/1715845019_emajine.jpeg" alt="" />
                            <img src="/storage/images/1715845019_emajine.jpeg" alt="" />
                            <img src="/storage/images/1715845019_emajine.jpeg" alt="" />
                            <img src="/storage/images/1715845019_emajine.jpeg" alt="" />
                        </div>
                    </div>
                </Authenticated>
            ) : (
                <Guest>
                    <Head title="Home" />
                    <div className="hero py-12 md:py-48">
                        <div className="hero-content flex-col lg:flex-row-reverse content-between">
                            <img
                                src="/logo.png"
                                className="max-w-md rounded-lg shadow-2xl hidden md:block"
                            />
                            <div>
                                <h1 className="text-8xl font-bold text-white">
                                    IDEAS Turned Into Reality
                                </h1>
                                <p className="py-6 max-w-lg text-white">
                                    With every single one of our clients, we
                                    bring forth a deep passion for creative
                                    problem solving — which is what we deliver.
                                </p>
                                <PrimaryButton className="btn btn-primary text-white">
                                    Get Started
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto bg-black flex flex-col items-center py-24">
                        <h1 className="text-8xl text-center text-orange-500 my-2 font-bold">
                            EMAJINE PORTAL
                        </h1>

                        <p className="text-white text-center max-w-lg mx-auto my-6 py-12 md:text-2xl">
                            Our self-service web portal allows you to order
                            products online and get support 24 heure /7. My
                            Emagine portal is a secure platform that allows you
                            to view your personal information, progress and
                            updates on your projects, manage your subscriptions
                            and print your invoices.
                        </p>
                        <PrimaryButton className="text-center">
                            Sign up/ Login Now
                        </PrimaryButton>
                    </div>
                </Guest>
            )}
        </div>
    );
}
