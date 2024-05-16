import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { useState } from 'react';
import Footer from './Footer';

export default function Guest({ children }) {
        const [showingNavigationDropdown, setShowingNavigationDropdown] =
            useState(false);
    return (
        <>
            <header className=" px-4 md:px-12 flex justify-between items-center bg-black">
                <ApplicationLogo className="w-48 fill-current text-gray-500 p-2" />
                <div className="hidden md:block space-x-8">
                    <NavLink href="/services">Services</NavLink>
                    <NavLink href="/register"> Register</NavLink>
                    <NavLink href="/login">login</NavLink>
                </div>
                <div className="-me-2 flex items-center sm:hidden">
                    <button
                        onClick={() =>
                            setShowingNavigationDropdown(
                                (previousState) => !previousState
                            )
                        }
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
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
            </header>
            <div
                className={
                    (showingNavigationDropdown ? "block" : "hidden") +
                    " sm:hidden bg-gray-500 border-t border-gray-200"
                }
            >
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink href="/services">
                        Services
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href="/register">
                        {" "}
                        Register
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href="/login">login</ResponsiveNavLink>
                </div>
            </div>
            <main className="bg-black">{children}</main>
            <Footer />
        </>
    );
}
