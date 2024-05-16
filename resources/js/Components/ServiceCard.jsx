import { Link } from "@inertiajs/react";

const ServiceCard = ({ service }) => {



    return (
        <div className=" mx-auto  shadow-lg">
            <img
                className="max-w-full object-contain"
                src={`/storage/${service.thumb}`}
                alt="Service Thumbnail"
            />
            <div className="px-6 py-4">
                <Link href={`/single/${service.id}`}>
                    <div className="font-bold text-xl mb-2">
                        {service.title}
                    </div>
                </Link>
                <div
                    dangerouslySetInnerHTML={{
                        __html: service.short_description,
                    }}
                    className="my-4"
                />
                <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-4">
                    CAD {service.price}
                </p>
            </div>
            <div className="px-6 py-2 flex">
                <form action="/session" method="POST">
                    <input type="hidden" name="service_id" value={service.id} />
                    <button
                        type="submit"
                        id="checkout-live-button"
                        className="inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 cursor-pointer bg-black text-white"
                    >
                        Buy Now
                    </button>
                </form>
                <Link
                    href={`/single/${service.id}`}
                    className="inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 cursor-pointer bg-black text-white"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ServiceCard;
