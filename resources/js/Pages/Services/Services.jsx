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
            <Head title="Services" />
            {auth?.user ? (
                <Authenticated user={auth.user}>
                    <div className="">
                        <h2 className="mt-8 text-2xl font-bold text-gray-700">
                            Our Services
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                            {isLoading ? (
                                <div className="gap-2">
                                    <ServiceSkilaton />
                                </div>
                            ) : isError ? (
                                "Something went wrong"
                            ) : (
                                data?.map((s) => (
                                    <ServiceCard key={s.id} service={s} />
                                ))
                            )}
                        </div>
                    </div>
                </Authenticated>
            ) : (
                <Guest>
                    <div className="container mx-auto">
                        <h2 className="mt-8 text-2xl font-bold">
                            Our Services
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                            {isLoading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                                    <ServiceSkilaton />
                                </div>
                            ) : isError ? (
                                "Something went wrong"
                            ) : (
                                data?.map((s) => (
                                    <ServiceCard key={s.id} service={s} />
                                ))
                            )}
                        </div>
                    </div>
                </Guest>
            )}
        </>
    );
};

export default Services;