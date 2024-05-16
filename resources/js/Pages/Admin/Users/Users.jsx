import Authenticated from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const Users = ({ auth }) => {


    const { isLoading, isError, data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            return axios.get('/admin/getusers').then((res) => {
                return res.data;
            });
        },
    });

    const handleMessage = async (recepeant) => {
        await axios.post('/create-conversations/', {
            'recepeant': recepeant,
        })
            .then(res => {
                router.visit(`/admin/conversation/${res.data.conversation.id}`);
            })
    }

    return (
        <Authenticated user={auth.user}>
            <div>
                {
                    isLoading ? ("Loading...") : isError ? ("Something went wrong...") :
                        data.map(
                            (u) => (
                                <div key={u.id} className={u.id === auth.user.id ? "hidden" : ''}>
                                    <h4>Name: {u.name}</h4>
                                    <button onClick={() => handleMessage(u.id)} href={`/create-conversations/${u.id}`} >
                                        Message
                                    </button>
                                </div>
                            )
                        )
                }
            </div>

            <button className='bg-blue-500'>Send Message</button>

        </Authenticated >
    );
};

export default Users;