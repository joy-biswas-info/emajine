import ServiceCard from '@/Components/ServiceCard';
import ServiceSkilaton from '@/Components/ServiceSkilaton';
import Authenticated from '@/Layouts/AuthenticatedLayout';
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
    );
};

export default Services;