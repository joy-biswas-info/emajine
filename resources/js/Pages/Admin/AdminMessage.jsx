import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import { FaArrowAltCircleDown } from 'react-icons/fa';

const AdminMessage = ({ auth, param }) => {
    const scrollRef = useRef();

    const { isLoading: conversationIsLoading, isError: conversationIsError, data: conversationData } = useQuery({
        queryKey: ['conversations'],
        queryFn: async () => {
            return axios.get('/admin/conversations').then((res) => {
                return res.data;
            });
        },
    });


    const queryClient = useQueryClient();
    const { isLoading, isError, data } = useQuery({
        queryKey: ["messages", param],
        queryFn: () =>
            axios.get(`/admin/get-message/${param}`).then((res) => {
                return res.data;
            }),
    });

    // Send message using same api both for user and admin 
    const mutation = useMutation({
        mutationFn: (message) => {
            return axios.post(`/send-message/`, message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["messages"]);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = e.target[0].value;
        mutation.mutate({ message: message, conversatioId: param });
        e.target[0].value = "";

    }

     useEffect(() => {
         scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
     }, [data]);

    return (
        <AdminLayout user={auth.user}>
            <div className="container mx-auto flex gap-12">
                <div className="usersContainer h-[550px] w-[350px] border p-1">
                    <div>
                        {conversationIsLoading
                            ? "Loading..."
                            : conversationIsError
                            ? "Something went wrong..."
                            : conversationData.map((c) => (
                                  <div key={c.id} className="my-5 border p-1">
                                      <Link
                                          href={`/admin/conversation/${c.id}`}
                                      >
                                          <div className="imgContainer flex gap-2">
                                              <img
                                                  src={`/storage/${c.sender.profile_picture}`}
                                                  alt=""
                                                  className="w-6 h-6 rounded-full"
                                              />
                                              <h2 className="">
                                                  {c.recipient.name}
                                              </h2>
                                          </div>
                                          <p>{c.last_message}</p>
                                      </Link>
                                  </div>
                              ))}
                    </div>
                </div>

                <div className="messagesContainer">
                    {isLoading ? (
                        "Loading..." ? (
                            isError
                        ) : (
                            "Something went wrong..."
                        )
                    ) : (
                        <div className="messageContainer w-[720px] h-[550px] overflow-y-scroll">
                            <div className="items my-4  flex flex-col gap-y-6">
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
                                                        ? "item owner flex"
                                                        : "item flex "
                                                }
                                                key={m.id}
                                            >
                                                <img
                                                    src={
                                                        parseFloat(
                                                            m.from_id
                                                        ) === auth.user.id
                                                            ? 
                                                                  `/storage/${auth.user.profile_picture}`
                                                              
                                                            : 
                                                                  `/storage/${m.from_user.profile_picture}`
                                                              
                                                    }
                                                    alt=""
                                                    className="w-6 h-6 rounded-full"
                                                />
                                                {/* {console.log(
                                                    m?.from_user.id,
                                                    m?.to_user?.id
                                                // )} */}
                                                <div>
                                                    <p className="max-w-[550px] p-2 rounded mx-1 my-1 message">
                                                        {m.message}
                                                    </p>
                                                    {m.file &&
                                                        m.file.length > 0 && (
                                                            <>
                                                                {typeof m
                                                                    .file[0]
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
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-row">
                        <textarea
                            type="text"
                            name="message"
                            id=""
                            className="p-1 bg-gray-200 border-0 w-[80%]"
                        />
                        <input
                            type="submit"
                            value="Send"
                            className="bg-blue-500 p-1 text-white cursor-pointer w-[20%]"
                        />
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminMessage;