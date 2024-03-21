import Authenticated from '@/Layouts/AuthenticatedLayout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import moment from 'moment';
import "./Messages.css";

const Messages = ({ auth }) => {

    const { isLoading: conversationIsLoading, isError: conversationIsError, data: conversationData } = useQuery({
        queryKey: ['conversations'],
        queryFn: async () => {
            return axios.get('/conversations').then((res) => {
                return res.data;
            });
        },
    });

    const queryClient = useQueryClient();
    const { isLoading, isError, data } = useQuery({
        queryKey: ["message", conversationData],
        queryFn: () =>
            axios.get(`/messages/${conversationData[0].id}?page=1`).then((res) => {
                return res.data;
            }),
    });

    const mutation = useMutation({
        mutationFn: (message) => {
            return axios.post(`/send-message/`, message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["message"]);
        },
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = e.target[0].value;
        mutation.mutate({ message: message, conversatioId: conversationData[0].id });
        e.target[0].value = "";

    }


    return (
        <Authenticated user={auth.user}>
            <div className='container mx-auto flex gap-12'>

                <div className="messagesContainer">
                    {
                        isLoading ? "Loading..." ? isError : "Something went wrong..." : <div className="messageContainer w-[720px] h-[550px] overflow-y-scroll"
                        >

                            <div className="items my-4  flex flex-col gap-y-6">
                                {data?.data
                                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map(
                                        (m) => (<><div className={parseFloat(m.from_id) === auth.user.id ? "item owner flex" : 'item flex '} key={m.id}>

                                            <img src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/9f97425c956ae56494390f595019869a-1677484348332/2c3c5d65-e9dc-4e72-b01e-7ad54a5a8648.jpeg" alt="" className='w-6 h-6 rounded-full' />
                                            <div>

                                            <p className='max-w-[550px] p-2 rounded mx-1 my-1 message'>{m.message}</p>
                                            <p className=' bg-transparent time'>{moment(m.created_at).fromNow()} </p>
                                            </div>
                                            
                                        </div>
                                        </>))}
                                        
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

export default Messages;