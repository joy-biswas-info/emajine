import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaArrowAltCircleDown, FaUser } from "react-icons/fa";
import "./Messages.css";

const Messages = ({ auth }) => {
    const [fileData, setFileData] = useState(null);
    const [refatch, setRefatch] = useState(false);
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
        const message = e.target[0].value;
        mutation.mutate({
            message: message,
            conversatioId: conversationData[0].id,
        });
        e.target[0].value = "";
    };

    // Mutation for uploading files
    const uploadFileMutation = useMutation({
        mutationFn: (file) => axios.post(`/file`, file),
        onSuccess: () => {
            queryClient.invalidateQueries(["files"]);
        },
    });

    // Fetch files when conversationData changes

    useEffect(() => {
        setRefatch(false);
        if (conversationData?.[0]?.id) {
            axios.get(`/files/${conversationData[0].id}`).then((result) => {
                setFileData(result.data);
            });
        }
    }, [conversationData, refatch]);

    // Handle file upload
    const handleFile = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("conversation_id", conversationData?.[0]?.id);
        if (file) {
            uploadFileMutation.mutate(formData);
            e.target.value = "";
            setRefatch(true);
        }
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Message" />
            <div className="container mx-auto flex flex-col md:flex-row gap-12 px-12 md:px-48 mt-12">
                <div className="messagesContainer w-[460px} h-[650px] md:w-[520px] flex flex-col justify-between content-between ">
                    <div className="flex gap-2 border-b-2">
                        <FaUser className="text-red-400 text-4xl mb-1" />
                        <p>Admin</p>
                    </div>
                    {isLoading ? (
                        "Loading..." ? (
                            isError
                        ) : (
                            "Something went wrong..."
                        )
                    ) : (
                        <div className="messageContainer w-[460px} h-[450px] md:w-[520px] overflow-y-scroll">
                            <div className="items my-4  flex flex-col gap-y-6">
                                {data?.data
                                    .sort(
                                        (a, b) =>
                                            new Date(a.created_at) -
                                            new Date(b.created_at)
                                    )
                                    .map((m, index) => (
                                        <>
                                            <div
                                                className={
                                                    parseFloat(m.from_id) ===
                                                    auth.user.id
                                                        ? "item owner flex"
                                                        : "item flex "
                                                }
                                                key={m.id}
                                             
                                                >

                                               
                                                <img
                                                    src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/9f97425c956ae56494390f595019869a-1677484348332/2c3c5d65-e9dc-4e72-b01e-7ad54a5a8648.jpeg"
                                                    alt=""
                                                    className="w-6 h-6 rounded-full"
                                                />
                                                <div>
                                                    <p className="max-w-[550px] p-2 rounded mx-1 my-1 message">
                                                        {m.message}
                                                    </p>
                                                    <p className=" bg-transparent time">
                                                        {moment(
                                                            m.created_at
                                                        ).fromNow()}{" "}
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                            </div>
                        </div>
                    )}
                    <div>
                        <form onSubmit={handleSubmit} className="flex flex-row">
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
                        </form>

                        <form className="mt-2">
                            <input
                                type="file"
                                name="file"
                                id="file"
                                accept=".pdf,.png,.jpg,.jpeg,.mp4,.docx,.doc"
                                onChange={(e) => handleFile(e)}
                            />
                            <p>.pdf,.png,.jpg,.jpeg,.mp4,.docx,.doc</p>
                        </form>
                    </div>
                </div>

                <>
                    <div>
                        <h2>Shared Files</h2>
                        <div className="flex flex-wrap flex-col md:flex-row gap-2 h-[550px] w-[250px] overflow-y-scroll">
                            {fileData?.map((file) => (
                                <div key={file.id} className="file-container">
                                    {["png", "jpg", "jpeg"].includes(
                                        file.file.split(".").pop().toLowerCase()
                                    ) ? (
                                        <div className="image-container">
                                            <img
                                                className="h-12 w-12"
                                                src={`/storage/${file.file}`}
                                                alt=""
                                            />
                                            <a
                                                className="download-link"
                                                href={`/storage/${file.file}`}
                                                download
                                            >
                                                <FaArrowAltCircleDown />
                                            </a>
                                        </div>
                                    ) : file.file
                                          .split(".")
                                          .pop()
                                          .toLowerCase() === "mp4" ? (
                                        <div>
                                            <video
                                                className="h-12 w-12"
                                                controls
                                            >
                                                <source
                                                    src={`/storage/${file.file}`}
                                                    type="video/mp4"
                                                />
                                            </video>
                                            <a
                                                className="download-link"
                                                href={`/storage/${file.file}`}
                                                download
                                            >
                                                <FaArrowAltCircleDown />
                                            </a>
                                        </div>
                                    ) : (
                                        <a
                                            href={`/storage/${file.file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {file.file.split("/").pop()}
                                            <FaArrowAltCircleDown />
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            </div>
        </Authenticated>
    );
};

export default Messages;
