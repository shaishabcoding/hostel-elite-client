import Swal from "sweetalert2";
import usePrivateClient from "../../../hooks/usePrivateClient";
import Loading from "../../../components/Loading";
import { FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const { loading } = useAuth();
  const privateClient = usePrivateClient();
  const {
    data: users,
    refetch,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["users", page, query],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get(
        `/users?search=${query}&offset=${page * 10}`
      );
      return res.data;
    },
    keepPreviousData: false,
  });

  const handleUserAdmin = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        privateClient.put(`/users/admin/${email}`).then(({ data }) => {
          if (data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Success",
              text: "Meal delete successfully!",
              icon: "success",
              confirmButtonText: "Done",
            });
          }
        });
      }
    });
  };

  const searchUsers = async (e) => {
    e.preventDefault();
    setQuery(e.target.query.value);
    refetch();
  };

  return (
    <div className="w-full lg:p-6 px-2 pb-2 lg:mx-0">
      <h2 className="text-2xl lg:mt-0 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        Manage Users
      </h2>
      <form onSubmit={searchUsers} className="flex justify-center mb-4 md:mb-6">
        <div className="join">
          <div>
            <div>
              <input
                className="input input-sm md:input-md input-bordered join-item border-primary"
                type="text"
                name="query"
                placeholder="Search for users..."
              />
            </div>
          </div>
          <div className="indicator">
            <button
              type="submit"
              className="btn btn-sm md:btn-md join-item btn-primary"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      <div className="overflow-x-auto rounded-md border">
        <table className="table table-xs md:table-md table-pin-rows table-pin-cols table-zebra bg-white">
          <thead>
            <tr>
              <th></th>
              <td>User Name</td>
              <td>Email</td>
              <td>Role</td>
              <td>Subscription</td>
            </tr>
          </thead>
          <tbody>
            {!isFetching && users?.users?.length < 1 && (
              <tr>
                <td colSpan={5} className="text-center text-error">
                  No users Data found.
                </td>
              </tr>
            )}
            {isFetching ? (
              <tr>
                <td colSpan={6}>
                  <Loading className="my-0" />
                </td>
              </tr>
            ) : (
              users?.users?.map((user, idx) => {
                const { _id, name, email, badge, role } = user;
                return (
                  <tr
                    key={_id}
                    className="dark:bg-gray-400 dark:text-white dark:even:text-gray-700"
                  >
                    <th className="dark:text-black dark:odd:bg-gray-400 ">
                      {idx + 1}
                    </th>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>
                      {role === "admin" ? (
                        role
                      ) : (
                        <button
                          onClick={() => handleUserAdmin(email)}
                          title="delete"
                          className="btn text-white btn-info btn-xs  md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
                        >
                          <FaUserPlus />
                        </button>
                      )}
                    </td>
                    <td>{badge}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="mx-auto w-fit my-6">
        <div className="join">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
            className="join-item btn btn-sm md:btn-md"
          >
            «
          </button>
          {Array.from({ length: Math.ceil(users?.usersCount / 10) }).map(
            (_, idx) => (
              <button
                className={`join-item btn btn-sm md:btn-md ${
                  page === idx && "bg-info border-info"
                }`}
                key={idx}
                onClick={() => setPage(idx)}
              >
                {idx + 1}
              </button>
            )
          )}
          <button
            onClick={() => {
              if (
                !isPreviousData &&
                page < Math.ceil(users?.usersCount / 10) - 1
              ) {
                setPage((old) => old + 1);
              }
            }}
            disabled={
              isPreviousData || page >= Math.ceil(users?.usersCount / 10) - 1
            }
            className="join-item btn btn-sm md:btn-md"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
