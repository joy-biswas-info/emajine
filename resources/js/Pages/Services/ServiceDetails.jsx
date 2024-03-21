import Authenticated from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";

const ServiceDetails = ({auth }) => {
    const page = usePage()
    // const { isPending, error, data } = useQuery({
    //     queryKey: ['singleService'],
    //     queryFn: () =>
    //       fetch(`/single-service/}`).then((res) =>
    //         res.json(),
    //       ),
    //   })
      console.log(page);
    return (
        <Authenticated user={auth.user}>
        <div className="container mx-auto">
            service card
        </div>
        </Authenticated>
    );
};

export default ServiceDetails;