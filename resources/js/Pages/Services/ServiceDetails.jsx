import Review from "@/Components/Review";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Guest from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const ServiceDetails = ({ auth }) => {
    const service = usePage().url.split("/")[2];
    const [errorMessage,setErrorMessage] = useState(null);

    const queryClient = useQueryClient();

    const { isLoading, isError, data } = useQuery({
        queryKey: ["singleService"],
        queryFn: () =>
            axios.get(`/single-service/${service}`).then((res) => {
                return res.data;
            }),
    });
    const [reviewData, setReviewData] = useState({
        service_id: "",
        review: "",
        rating: 5,
    });
    const {
        isLoading: reviewIsLoading,
        isError: reviewIsError,
        data: reviews,
    } = useQuery({
        queryKey: ["reviews", data],
        queryFn: () =>
            axios.get(`/reviews/${data.id}`).then((res) => {
                return res.data;
            }),
    });

    const handleRatingChange = (ratingValue) => {
        setReviewData((prevState) => ({
            ...prevState,
            rating: ratingValue,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const mutation = useMutation({
        
        mutationFn: (review) => {
            return axios.post("/add-review", review);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["review"]);
            setErrorMessage(null)
        },onError:(err)=>{
            setErrorMessage(err.response.status)

        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(null)
        mutation.mutate({ ...reviewData });
    };
    return (
        <>
            {auth.user ? (
                <Authenticated user={auth.user}>
                    <Head title="Service Details" />
                    <div className="container mx-auto px-12 md:px-48 mt-12">
                        {isLoading ? (
                            "Loading"
                        ) : isError ? (
                            "Something went wrong"
                        ) : (
                            <>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <img
                                        src={`/storage/${data.thumb}`}
                                        alt=""
                                        className="w-full"
                                    />
                                    <div className="flex flex-col">
                                        <h2 className="text-xl md:text-2xl font-bold my-4">
                                            {data.title}
                                        </h2>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: data.short_description,
                                            }}
                                            className="my-4"
                                        />
                                        <div className="flex items-center gap-3">
                                            <p className="inline-block w-24 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 my-4">
                                                CAD {data.price}
                                            </p>
                                            <form
                                                action="/session"
                                                method="POST"
                                            >
                                                <input
                                                    type="hidden"
                                                    name="service_id"
                                                    value={data.id}
                                                />
                                                <button
                                                    type="submit"
                                                    id="checkout-live-button"
                                                    className="inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 cursor-pointer bg-black text-white"
                                                >
                                                    Buy Now
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold my-6 md:my-8 py-2 border-b-2 border-b-stone-700">
                                    Description
                                </h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data.description,
                                    }}
                                    className="my-4 max-w-xl"
                                />
                                <div className="mt-12 mb-2">
                                    {reviewIsLoading ? (
                                        "loading"
                                    ) : reviewIsError ? (
                                        "Error"
                                    ) : reviews ? (
                                        <>
                                            {reviews.length > 0 && (
                                                <h2 className="text-2xl font-bold">
                                                    Review
                                                </h2>
                                            )}

                                            {reviews.map((review) => (
                                                <div key={review.id}>
                                                    <Review review={review} />
                                                </div>
                                            ))}
                                        </>
                                    ) : null}
                                    <form
                                        onSubmit={handleSubmit}
                                        className="mt-24"
                                    >
                                        <p className="hidden">
                                            {" "}
                                            {(reviewData.service_id = data.id)}
                                        </p>
                                        <div className="mb-4">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="review"
                                            >
                                                Write your Review
                                            </label>
                                            <textarea
                                                id="review"
                                                name="review"
                                                required
                                                value={reviewData.review}
                                                onChange={handleChange}
                                                className="border rounded-md px-4 py-2 w-full"
                                                rows="4"
                                                placeholder="Enter your review..."
                                            />
                                        </div>
                                        <div className="">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="review"
                                            >
                                                Your rating
                                            </label>
                                            <div className="flex my-1">
                                                {[...Array(5)].map(
                                                    (star, index) => {
                                                        const ratingValue =
                                                            index + 1;
                                                        return (
                                                            <label
                                                                key={index}
                                                                className="cursor-pointer"
                                                            >
                                                                <input
                                                                    className="hidden"
                                                                    type="radio"
                                                                    name="rating"
                                                                    value={
                                                                        ratingValue
                                                                    }
                                                                    onChange={() =>
                                                                        handleRatingChange(
                                                                            ratingValue
                                                                        )
                                                                    }
                                                                />
                                                                <FaStar
                                                                    className="text-yellow-500"
                                                                    size={25}
                                                                    style={{
                                                                        marginRight:
                                                                            "5px",
                                                                    }}
                                                                    color={
                                                                        ratingValue <=
                                                                        reviewData.rating
                                                                            ? "#FFD700"
                                                                            : "#D1D5DB"
                                                                    }
                                                                />
                                                            </label>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                </Authenticated>
            ) : (
                <Guest>
                    <Head title="Service Details" />

 <div className="container mx-auto px-12 md:px-48 mt-12">
                        {isLoading ? (
                            "Loading"
                        ) : isError ? (
                            "Something went wrong"
                        ) : (
                            <>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <img
                                        src={`/storage/${data.thumb}`}
                                        alt=""
                                        className="w-full"
                                    />
                                    <div className="flex flex-col">
                                        <h2 className="text-xl md:text-2xl font-bold my-4">
                                            {data.title}
                                        </h2>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: data.short_description,
                                            }}
                                            className="my-4"
                                        />
                                        <div className="flex items-center gap-3">
                                            <p className="inline-block w-24 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 my-4">
                                                CAD {data.price}
                                            </p>
                                            <form
                                                action="/session"
                                                method="POST"
                                            >
                                                <input
                                                    type="hidden"
                                                    name="service_id"
                                                    value={data.id}
                                                />
                                                <button
                                                    type="submit"
                                                    id="checkout-live-button"
                                                    className="inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 cursor-pointer bg-black text-white"
                                                >
                                                    Buy Now
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold my-6 md:my-8 py-2 border-b-2 border-b-stone-700">
                                    Description
                                </h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data.description,
                                    }}
                                    className="my-4 max-w-xl"
                                />
                                <div className="mt-12 mb-2">
                                    {reviewIsLoading ? (
                                        "loading"
                                    ) : reviewIsError ? (
                                        "Error"
                                    ) : reviews ? (
                                        <>
                                            {reviews.length > 0 && (
                                                <h2 className="text-2xl font-bold">
                                                    Review
                                                </h2>
                                            )}

                                            {reviews.map((review) => (
                                                <div key={review.id}>
                                                    <Review review={review} />
                                                </div>
                                            ))}
                                        </>
                                    ) : null}
                                    
                                </div>
                            </>
                        )}
                    </div>
                </Guest>
            )}
        </>
    );
};

export default ServiceDetails;
