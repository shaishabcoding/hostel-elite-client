import Swal from "sweetalert2";
import usePrivateClient from "../../../hooks/usePrivateClient";
import Loading from "../../../components/Loading";
import useUsers from "../../../hooks/useUsers";
import { FaUserPlus } from "react-icons/fa";
import Autocomplete from "./meals/components/Autocomplete";
import { useState } from "react";

const ManageUsers = () => {
  const [query, setQuery] = useState("");
  const [users, refetch, loading] = useUsers(query);
  const privateClient = usePrivateClient();

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

  const searchUsers = async (query) => {
    setQuery(query);
    refetch();
  };

  return (
    <div className="w-full lg:p-6 px-2 pb-2 lg:mx-0">
      <h2 className="text-2xl lg:mt-0 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        Manage Users
      </h2>
      <div className="flex justify-center mb-4 md:mb-6">
        <Autocomplete onSelect={searchUsers}></Autocomplete>
      </div>
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
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <Loading className="my-0" />
                </td>
              </tr>
            ) : (
              users?.map((user, idx) => {
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
    </div>
  );
};

export default ManageUsers;
