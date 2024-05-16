import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import React from "react";

const Footer = () => {
    return (
        <div className="bg-black border-t border-t-white grid grid-cols-4 gap-12 py-8">
            <div>
                <img src="/logo.png" alt="" className="w-96 px-12" />
                <p className="text-white px-12">
                    Unlock Revenue Growth for Your Business
                </p>
            </div>
            <div className="flex flex-col gap-y-6">
                <h2 className="text-xl font-semibold text-white my-8">
                    Services
                </h2>
                <Link className="text-white">Service</Link>
                <Link className="text-white">Contact</Link>
                <Link className="text-white">Invoice</Link>
                <Link className="text-white">Message</Link>
            </div>
            <div>
                <h2 className="text-xl font-semibold text-white my-8">
                    Contact
                </h2>
                <p className="text-white">
                    6275 place Northcrest, <br /> Mobile:514-566-7033
                </p>
            </div>
        </div>
    );
};

export default Footer;
