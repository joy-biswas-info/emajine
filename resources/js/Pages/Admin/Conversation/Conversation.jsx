
import AdminLayout from '@/Layouts/AdminLayout';
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
        <AdminLayout user={auth.user}>
            <div className="container mx-auto">
                <div className="conversations">
                    {isLoading
                        ? "Loading"
                        : isError
                        ? "error"
                        : data
                              .sort(
                                  (a, b) =>
                                      new Date(a.updated_at) -
                                      new Date(b.updated_at)
                              )
                              .map((c) => (
                                  <div
                                      key={c.id}
                                      className={
                                          c.seen_by_admin == 0
                                              ? "bg-gray-200 my-5 border p-1"
                                              : "my-5 border p-1"
                                      }
                                  >
                                      <Link
                                          href={`/admin/conversation/${c.id}`}
                                      >
                                          <div className="imgContainer flex gap-2">
                                              <img
                                                  src={`/storage/${c.sender.profile_picture}`}
                                                  alt=""
                                                  className="w-6 h-6 rounded-full"
                                              />
                                              <h2 className={"font-bold"}>
                                                  {c.recipient.name}
                                              </h2>
                                          </div>
                                          <p
                                              className={
                                                  c.seen_by_admin == 0
                                                      ? " font-semibold"
                                                      : ""
                                              }
                                          >
                                              {c.last_message}
                                          </p>
                                      </Link>
                                  </div>
                              ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Conversation;