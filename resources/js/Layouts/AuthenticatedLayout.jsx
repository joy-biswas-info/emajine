import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, router } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import Footer from "./Footer";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const hasPlayedSound = useRef(false);

    const {
        isLoading: conversationIsLoading,
        isError: conversationIsError,
        data: conversationData,
    } = useQuery({
        queryKey: ["conversation"],
        queryFn: async () => {
            return axios.get("/conversation").then((res) => {
                return res.data;
            });
        },
        refetchInterval: 1000,
        refetchIntervalInBackground:true,
        refetchOnMount:true,
    });

    const handleClick = async (recepeant) => {
        await axios
            .post("/create-conversations", {
                recepeant: recepeant,
            })
            .then(() => {
                router.visit("/message");
            });
        const response = await axios.post("/update-conversations", {
            conversation_id: conversationData.conversation[0].id,
        });
    };

    useEffect(() => {
        if (
            !conversationIsLoading &&
            conversationData?.conversation?.[0]?.seen_by_user === 0 &&
            !hasPlayedSound.current
        ) {
            hasPlayedSound.current = true;
            const audioElement = new Audio("/sound.wav");
            audioElement.play();
        }
    }, [conversationData, conversationIsLoading, hasPlayedSound]);
    const handleSound =async () => {
        const response = await axios.post("/update-conversations", {
            conversation_id: conversationData.conversation[0].id,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-black border-b border-gray-200 py-2">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-20 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("services")}
                                    active={route().current("services")}
                                >
                                    Services
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-black bg-white hover:text-gray-600 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("services")}
                            active={route().current("services")}
                        >
                            Services
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="">
                {children}

                <div
                    class="toast cursor-pointer"
                    onClick={() => handleClick(1)}
                >
                    {!conversationIsLoading &&
                    conversationData?.conversation[0]?.seen_by_user == 0 && (
                        <>
                            <p className="rounded-full bg-red-500 text-white w-6 h-6 text-center">
                                1
                            </p>
                            <audio
                                ref={hasPlayedSound}
                                onPlay={() => (hasPlayedSound.current = true)}
                                src="/sound.wav"
                                autoPlay
                            />
                        </>
                    )}
                    
                    <div className="alert alert-warning bg-center">
                        <span>
                            <FaEnvelope
                                className="text-white"
                                onClick={() => handleSound()}
                            />
                        </span>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}
