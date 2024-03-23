import ServiceCard from '@/Components/ServiceCard';
import ServiceSkilaton from '@/Components/ServiceSkilaton';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Guest from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';

const Services = ({ auth }) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['allServices'],
        queryFn: async () => {
            return axios.get('/all-services').then((res) => {
                return res.data;
            });
        },
    });

    return (
        <>
        <Head title='Services'/>
        {
            auth?.user ?
                <Authenticated user={auth.user}>
                <div className='container mx-auto'>
                    <div className=' flex justify-between flex-wrap gap-2'>
                        {isLoading ? <div className="flex items-center gap-2">
                            <ServiceSkilaton />
                        </div>
                            : isError ? "Something went wrong" :
                                data?.map((s) =>
                                    <ServiceCard key={s.id} service={s} />
                                )
                        }
                    </div>
                </div>
            </Authenticated>
                
           :
    <Guest>
            <div className='container mx-auto'>
                    <div className=' flex justify-between flex-wrap gap-2'>
                        {isLoading ? <div className="flex items-center gap-2">
                            <ServiceSkilaton />
                        </div>
                            : isError ? "Something went wrong" :
                                data?.map((s) =>
                                    <ServiceCard key={s.id} service={s} />
                                )
                        }
                    </div>
                </div>
            </Guest>
            }    
        
        
        </>
        
    );
};

export default Services;