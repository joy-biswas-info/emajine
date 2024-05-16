import Invoices from "@/Components/Invoices";
import Orders from "@/Components/Orders";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import "./Messages.css";

const Messages = ({ auth }) => {
    const scrollRef = useRef();

    const {
        isLoading: conversationIsLoading,
        isError: conversationIsError,
        data: conversationData,
    } = useQuery({
        queryKey: ["Conversation"],
        queryFn: () =>
            axios.get("/conversations").then((res) => {
                return res.data;
            }),
    });

    const queryClient = useQueryClient();
    const { isLoading, isError, data } = useQuery({
        queryKey: ["message", conversationData],
        queryFn: () =>
            axios.get(`/messages/${conversationData[0].id}`).then((res) => {
                return res.data;
            }),
        enabled: !!conversationData?.[0]?.id,
        refetchInterval: 5000,
    });

    const mutation = useMutation({
        mutationFn: (message) => {
            return axios.post(`/send-message`, message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["message"]);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const message = e.target[0].value;
        const conversatioId = conversationData[0].id;
        const file = e.target[2].files[0];
        formData.append("file", file);
        formData.append("message", message);
        formData.append("conversatioId", conversatioId);

        mutation.mutate(formData);
        e.target[0].value = "";
    };
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [data]);

    return (
        <Authenticated user={auth.user}>
            <Head title="Message" />
            <div className="container mx-auto flex flex-col md:flex-row gap-12 px-12 md:px-48 mt-12">
                <div className="messagesContainer w-[460px} h-[90vh] md:w-[520px] flex flex-col justify-between content-between ">
                    <div className="flex gap-2 border-b-2 items-center">
                        <img
                            src="/logo.png"
                            alt=""
                            className="w-12 h-12 rounded-full object-fit-contain border"
                        />
                        <p>Emajine </p>
                    </div>
                    {isLoading ? (
                        <div className="messageContainer w-[460px} md:w-[520px] overflow-y-scroll">
                            loading
                        </div> ? (
                            isError
                        ) : (
                            "Something went wrong..."
                        )
                    ) : (
                        <div className="messageContainer w-[460px} md:w-[520px] overflow-y-scroll">
                            {data?.data
                                .sort(
                                    (a, b) =>
                                        new Date(a.created_at) -
                                        new Date(b.created_at)
                                )
                                .map((m, index) => (
                                    <div key={m.id}>
                                        <div
                                            ref={scrollRef}
                                            className={
                                                parseFloat(m.from_id) ===
                                                auth.user.id
                                                    ? "item owner flex chat-end"
                                                    : "item flex chat-start"
                                            }
                                            key={m.id}
                                        >
                                            <div className="chat-image avatar">
                                                <div className="w-10 rounded-full">
                                                    <img
                                                        src={
                                                            parseFloat(
                                                                m.from_id
                                                            ) === auth.user.id
                                                                ? `/storage/${auth.user.profile_picture}`
                                                                : `/storage/${m.from_user.profile_picture}`
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <p className="max-w-[550px] p-2 rounded mx-1 my-1 message chat-bubble">
                                                    {m.message}
                                                </p>
                                                {m.file &&
                                                    m.file.length > 0 && (
                                                        <>
                                                            {typeof m.file[0]
                                                                .file ===
                                                                "string" && (
                                                                <>
                                                                    {[
                                                                        "png",
                                                                        "jpg",
                                                                        "jpeg",
                                                                    ].includes(
                                                                        m.file[0].file
                                                                            .split(
                                                                                "."
                                                                            )
                                                                            .pop()
                                                                            .toLowerCase()
                                                                    ) ? (
                                                                        // Render image component
                                                                        <div className="image-container">
                                                                            <img
                                                                                className="h-24 w24"
                                                                                src={`/storage/${m.file[0].file}`}
                                                                                alt=""
                                                                            />
                                                                            <a
                                                                                className="download-link"
                                                                                href={`/storage/${m.file[0].file}`}
                                                                                download
                                                                            >
                                                                                <FaArrowAltCircleDown />
                                                                            </a>
                                                                        </div>
                                                                    ) : m.file[0].file
                                                                          .split(
                                                                              "."
                                                                          )
                                                                          .pop()
                                                                          .toLowerCase() ===
                                                                      "mp4" ? (
                                                                        // Render video component
                                                                        <div>
                                                                            <video
                                                                                className="h-24 w24"
                                                                                controls
                                                                            >
                                                                                <source
                                                                                    src={`/storage/${m.file[0].file}`}
                                                                                    type="video/mp4"
                                                                                />
                                                                            </video>
                                                                            <a
                                                                                className="download-link"
                                                                                href={`/storage/${m.file[0].file}`}
                                                                                download
                                                                            >
                                                                                <FaArrowAltCircleDown />
                                                                            </a>
                                                                        </div>
                                                                    ) : (
                                                                        // Render generic file link
                                                                        <a
                                                                            href={`/storage/${m.file[0].file}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            {m.file[0].file
                                                                                .split(
                                                                                    "/"
                                                                                )
                                                                                .pop()}
                                                                            <FaArrowAltCircleDown />
                                                                        </a>
                                                                    )}
                                                                </>
                                                            )}
                                                        </>
                                                    )}

                                                <p className=" bg-transparent time">
                                                    {moment(
                                                        m.created_at
                                                    ).fromNow()}{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                    <div>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-y-2"
                        >
                            <div className="flex">
                                <textarea
                                    type="text"
                                    name="message"
                                    id=""
                                    className="p-1 bg-gray-200 border-0  w-[80%] lg:w-[100%]"
                                />
                                <input
                                    type="submit"
                                    value="Send"
                                    id="btn-message"
                                    className="bg-blue-500 p-1 text-white cursor-pointer w-[20%]"
                                />
                            </div>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                accept=".pdf,.png,.jpg,.jpeg,.mp4,.docx,.doc"
                            />
                            <p>.pdf,.png,.jpg,.jpeg,.mp4,.docx,.doc</p>
                        </form>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div>
                        <Invoices />
                    </div>
                    <div>
                        <Orders />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Messages;
