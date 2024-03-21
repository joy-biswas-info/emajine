import { Link } from "@inertiajs/react";

const ServiceCard = ({ service }) => {

    // const handleMessage = async (recepeant) => {
    //     await axios
    //         .post("/create-conversations/", {
    //             recepeant: recepeant,
    //         })
    //         .then((res) => {
    //             router.visit("/message");
    //         });
    // };


    return (
        <div className="max-w-sm mx-auto overflow-hidden shadow-lg">
            <img
                className="w-full h-[300px]"
                src={`/storage/${service.thumb}`}
                alt="Service Thumbnail"
            />
            <div className="px-6 py-4">
                <Link href={`/single/${service.id}`} >

                <div className="font-bold text-xl mb-2">{service.title}</div>
                </Link>
                <p className="text-gray-700 text-base">
                    {service.short_description}
                </p>
            </div>
            <div className="px-6 py-4 flex">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    CAD {service.price}
                </span>
                {/* <span
                    onClick={() => handleMessage(1)}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 cursor-pointer"
                >
                    Message Now
                </span> */}
                
                <form action="/session" method="POST">
                    <input type="hidden" name="service_id" value={service.id}/>
                    <button type="submit" id="checkout-live-button" className="inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 cursor-pointer bg-black text-white">Buy Now</button>
                </form>
            </div>
        </div>
    );
};

export default ServiceCard;
