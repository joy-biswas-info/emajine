import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const AdminMessage = ({ auth, param }) => {

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


    return (
        <Authenticated user={auth.user}>
            <div className='container mx-auto flex gap-12'>
                <div className="usersContainer h-[550px] w-[350px] border p-1">
                    <div>
                        {
                            conversationIsLoading ? ("Loading...") : conversationIsError ? ("Something went wrong...") :
                                conversationData.map(
                                    (c) => (
                                        <div key={c.id} className='my-5 border p-1'>
                                            < Link href={`/admin/conversation/${c.id}`}>
                                                <div className="imgContainer flex gap-2">
                                                    <img src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/9f97425c956ae56494390f595019869a-1677484348332/2c3c5d65-e9dc-4e72-b01e-7ad54a5a8648.jpeg" alt="" className='w-6 h-6 rounded-full' />
                                                    <h2 className=''>{c.recipient.name}</h2>
                                                </div>
                                                <p>{c.last_message}</p>
                                            </Link>
                                        </div>
                                    ))}
                    </div>
                </div>

                <div className="messagesContainer">
                    {
                        isLoading ? "Loading..." ? isError : "Something went wrong..." : <div className="messageContainer w-[720px] h-[550px] overflow-y-scroll"
                        >
                            <div className="items my-4  flex flex-col gap-y-6">
                                {data?.data
                                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map(
                                        (m) => (<div className={parseFloat(m.from_id) === auth.user.id ? "item owner flex" : 'item flex '} key={m.id}>

                                            <img src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/9f97425c956ae56494390f595019869a-1677484348332/2c3c5d65-e9dc-4e72-b01e-7ad54a5a8648.jpeg" alt="" className='w-6 h-6 rounded-full' />
                                            <p className='max-w-[550px]  p-2 rounded mx-1'>{m.message}</p>
                                        </div>))}
                            </div>
                        </div>

                    }
                    <form onSubmit={handleSubmit} className='flex flex-row'>
                        <textarea type="text" name="message" id="" className='p-1 bg-gray-200 border-0 w-[80%]' />
                        <input type="submit" value="Send" className='bg-blue-500 p-1 text-white cursor-pointer w-[20%]' />
                    </form>
                </div>

            </div>
        </Authenticated>
    );
};

export default AdminMessage;