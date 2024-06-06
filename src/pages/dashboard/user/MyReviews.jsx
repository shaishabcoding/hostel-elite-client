import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import useReviews from "../../../hooks/useReviews";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import Swal from "sweetalert2";
import usePrivateClient from "../../../hooks/usePrivateClient";
import { useState } from "react";
const MyReviews = () => {
  const [meals, refetch, loading] = useReviews();
  const [newReview, setNewReview] = useState();
  const [updateLoading, setUpdateLoading] = useState([false, ""]);
  const [deleteLoading, setDeleteLoading] = useState([false, ""]);
  const privateClient = usePrivateClient();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleteLoading([true, id]);
        privateClient.delete(`/meals/${id}/review`).then(({ data }) => {
          if (data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Success",
              text: "Review delete successfully!",
              icon: "success",
              confirmButtonText: "Done",
            });
            setDeleteLoading([false, id]);
          }
        });
      }
    });
  };

  const handleUpdate = (id, text) => {
    Swal.fire({
      title: "Update Review",
      html: `
      <input
        type="text"
        value="${text}"
        class="input input-bordered"
        id="review">`,
      didOpen: () => {
        const newReview = Swal.getPopup().querySelector("#review");
        newReview.addEventListener("input", () => {
          setNewReview(newReview.value);
        });
      },
      confirmButtonText: "Update",
    }).then((result) => {
      if (result.isConfirmed) {
        setUpdateLoading([true, id]);
        privateClient
          .put(`/meals/${id}/review`, { review: newReview })
          .then(({ data }) => {
            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Success",
                text: "Review successfully!",
                icon: "success",
                confirmButtonText: "Done",
              });
              setUpdateLoading([false, id]);
            }
          });
      }
    });
  };

  return (
    <div className="w-full lg:p-6 px-2 pb-2 lg:mx-0">
      <h2 className="text-2xl lg:mt-0 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        My Reviews
      </h2>
      <div className="overflow-x-auto rounded-md border">
        <table className="table table-xs md:table-md table-pin-rows table-pin-cols table-zebra bg-white">
          <thead>
            <tr>
              <th></th>
              <td>Title</td>
              <td>Like</td>
              <td>Review</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {!loading && meals?.length < 1 && (
              <tr>
                <td colSpan={5} className="text-center text-error">
                  No Review Data found.
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
                const { _id, title, likes, reviews } = meal;
                return (
                  <tr
                    key={_id}
                    className="dark:bg-gray-400 dark:text-white dark:even:text-gray-700"
                  >
                    <th className="dark:text-black dark:odd:bg-gray-400 ">
                      {idx + 1}
                    </th>
                    <td>{title}</td>
                    <td>{likes}</td>
                    <td>{reviews.review}</td>
                    <td className="flex gap-2 w-fit">
                      <button
                        disabled={updateLoading[0] && updateLoading[1] === _id}
                        onClick={() => handleUpdate(_id, reviews.review)}
                        title="update"
                        className="btn disabled:text-black text-white btn-info btn-xs md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
                      >
                        {updateLoading[0] && updateLoading[1] === _id ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <BiSolidEdit />
                        )}
                      </button>

                      <button
                        disabled={deleteLoading[0] && deleteLoading[1] === _id}
                        onClick={() => handleDelete(_id)}
                        title="delete"
                        className="btn text-white disabled:text-black btn-error btn-xs  md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
                      >
                        {deleteLoading[0] && deleteLoading[1] === _id ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <RiDeleteBin6Fill />
                        )}
                      </button>
                      <Link className="grid w-full" to={`/meal/${_id}`}>
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

export default MyReviews;
