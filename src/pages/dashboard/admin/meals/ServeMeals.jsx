import { useState } from "react";
import useServeMeals from "../../../../hooks/useServeMeals";
import Swal from "sweetalert2";
import Loading from "../../../../components/Loading";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { MdShoppingCartCheckout } from "react-icons/md";
import usePrivateClient from "../../../../hooks/usePrivateClient";

const ServeMeals = () => {
  const [meals, refetch, loading] = useServeMeals();
  const [serveLoading, setServeLoading] = useState([false, ""]);
  const privateClient = usePrivateClient();

  const handleServe = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, serve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setServeLoading([true, id]);
        privateClient.put(`/meals/serve/${id}`).then(({ data }) => {
          if (data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Success",
              text: "Meal serve successfully!",
              icon: "success",
              confirmButtonText: "Done",
            });
            setServeLoading([false, id]);
          }
        });
      }
    });
  };
  return (
    <div className="w-full lg:p-6 px-2 pb-2 lg:mx-0">
      <h2 className="text-2xl lg:mt-0 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        Serve Meals
      </h2>
      <div className="overflow-x-auto rounded-md border">
        <table className="table table-xs md:table-md table-pin-rows table-pin-cols table-zebra bg-white">
          <thead>
            <tr>
              <th></th>
              <td>Title</td>
              <td>Email</td>
              <td>Name</td>
              <td>Status</td>
              <td></td>
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
              meals?.map((meal, idx) => {
                const { _id, mealId, title, email, username, status } = meal;
                return (
                  <tr
                    key={_id}
                    className="dark:bg-gray-400 dark:text-white dark:even:text-gray-700"
                  >
                    <th className="dark:text-black dark:odd:bg-gray-400 ">
                      {idx + 1}
                    </th>
                    <td>{title}</td>
                    <td>{email}</td>
                    <td>{username}</td>
                    <td>{status}</td>
                    <td className="flex gap-2 w-fit">
                      <button
                        onClick={() => handleServe(_id)}
                        title="Serve"
                        className="btn text-white btn-error btn-xs  md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
                      >
                        <MdShoppingCartCheckout />
                      </button>
                      <Link className="grid w-full" to={`/meal/${mealId}`}>
                        <button
                          title="details"
                          className="btn text-white btn-xs btn-primary md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
                        >
                          <TbListDetails />
                        </button>
                      </Link>
                    </td>
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

export default ServeMeals;
