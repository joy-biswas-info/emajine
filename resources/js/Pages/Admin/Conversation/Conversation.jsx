
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Conversation = ({ auth }) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['conversations'],
        queryFn: async () => {
            return axios.get('/admin/conversations').then((res) => {
                return res.data;
            });
        },
    });

    return (
        <Authenticated user={auth.user}>
            <div className="container mx-auto">
                <div className="conversations">
                    {isLoading ? "Loading" : isError ? "error" : data.map((c) => (
                        <div key={c.id} className='my-5 border p-4 w-[450px]'>
                            < Link href={`/admin/conversation/${c.id}/`} >
                                <div className="imgContainer flex gap-2">
                                    <img src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/9f97425c956ae56494390f595019869a-1677484348332/2c3c5d65-e9dc-4e72-b01e-7ad54a5a8648.jpeg" alt="" className='w-6 h-6 rounded-full' />
                                   {
                                    c.sender.role === "Admin" ?<span>{c.recipient.name}</span>: <span>{c.sender.name} </span>
                                   }
                                </div>
                                <p>{c?.last_message}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Authenticated>
    );
};

export default Conversation;