import useRequestedMeals from "../../../hooks/useRequestedMeals";
import Loading from "../../../components/Loading";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import usePrivateClient from "../../../hooks/usePrivateClient";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";

const RequestedMeals = () => {
  const [meals, refetch, loading] = useRequestedMeals();
  const [deleteLoading, setDeleteLoading] = useState([false, ""]);
  const privateClient = usePrivateClient();

  const handleDelete = (id) => {
    setDeleteLoading([true, id]);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        privateClient.delete(`/meals/request/${id}`).then(({ data }) => {
          if (data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Success",
              text: "Meal cancel successfully!",
              icon: "success",
              confirmButtonText: "Done",
            });
            setDeleteLoading([false, id]);
          }
        });
      } else setDeleteLoading([false, id]);
    });
  };

  return (
    <div className="w-full lg:p-6 px-2 pb-2 lg:mx-0">
      <h2 className="text-2xl lg:mt-0 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        Requested Meals
      </h2>
      <div className="overflow-x-auto rounded-md border">
        <table className="table table-xs md:table-md table-pin-rows table-pin-cols table-zebra bg-white">
          <thead>
            <tr>
              <th></th>
              <td>Title</td>
              <td>Like</td>
              <td>Reviews</td>
              <td>Status</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {!loading && meals?.length < 1 && (
              <tr>
                <td colSpan={5} className="text-center text-error">
                  No Requested meals Data found.
                </td>
              </tr>
            )}
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <Loading className="my-0" />
                </td>
              </tr>
            ) : (
              meals?.map((meal, idx) => {
                const { _id, mealId, title, likes, reviews, status } = meal;
                return (
                  <tr
                    key={_id}
                    className="dark:bg-gray-400 dark:text-white dark:even:text-gray-700"
                  >
                    <th className="dark:text-black dark:odd:bg-gray-400 ">
                      {idx + 1}
                    </th>
                    <td>{title}</td>
                    <td>{likes || 0}</td>
                    <td>{reviews?.length || 0}</td>
                    <td>{status}</td>
                    <td className="flex gap-2 w-fit">
                      <button
                        disabled={
                          (deleteLoading[0] && deleteLoading[1] === _id) ||
                          status === "Delivered"
                        }
                        onClick={() => handleDelete(_id)}
                        title="cancel"
                        className="btn text-white disabled:text-black btn-error btn-xs  md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
                      >
                        {deleteLoading[0] && deleteLoading[1] === _id ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <RiDeleteBin6Fill />
                        )}
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

export default RequestedMeals;
