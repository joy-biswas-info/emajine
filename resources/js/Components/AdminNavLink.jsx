import { Link } from "@inertiajs/react";

export default function AdminNavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 rounded-none text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-white text-white focus:border-indigo-700 bg-gray-700 px-1 "
                    : "border-transparent text-gray-300 hover:text-gray-200 focus:text-gray-700 focus:border-gray-300 hover:bg-gray-700 ") +
                className
            }
        >
            {children}
        </Link>
    );
}
