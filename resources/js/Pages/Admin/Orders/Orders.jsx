import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { FaTools } from 'react-icons/fa';

const Orders = ({auth}) => {
  const { isLoading, isError, data } = useQuery({
      queryKey: ['orders'],
      queryFn: () =>
          axios.get('/admin/all-orders').then((res) => {
              return res.data;
          }),
  });

  return (
      <AdminLayout user={auth.user}>
        <Head title='Orders'/>
          <div className="mx-auto container ">
              {isLoading ? (
                  "Loading"
              ) : isError ? (
                  "Something went wrong"
              ) : (
                  <>
                      {" "}
                      <h2 className="text-2xl font-bold my-4 ">Orders</h2>
                      <table className="mt-5 w-full">
                          <thead>
                              <tr className="bg-gray-200">
                                  <th className="py-2 px-4">No</th>
                                  <th className="py-2 px-4">Title</th>
                                  <th className="py-2 px-4">Status</th>
                                  <th className="py-2 px-4">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {data.map((order, index) => (
                                  <tr
                                      key={order.id}
                                      className={
                                          index % 2 === 0
                                              ? "bg-gray-100 text-center"
                                              : "bg-white text-center"
                                      }
                                  >
                                      <td className="py-4 px-4 w-12">
                                          {index + 1}
                                      </td>
                                      <td className=" px-4">
                                          {order.service?.title}
                                      </td>
                                      <td className="py-2 px-4 w-48">
                                          <p className="bg-green-300 rounded-lg">
                                              {order.status}
                                          </p>
                                      </td>
                                      <td >
                                          <button className="btn bg-green-500 hover:bg-green-600 text-white mr-2">
                                              {order.status === "Processing"
                                                  ? "Mark as complete"
                                                  : "Mark as processing"}
                                          </button>
                                          {order.status !== "Cancled" && <button className='btn btn-error'>Cancle order</button>}
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </>
              )}
          </div>
      </AdminLayout>
  );
};

export default Orders;