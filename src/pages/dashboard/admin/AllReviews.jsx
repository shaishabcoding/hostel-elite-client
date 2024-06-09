import Swal from "sweetalert2";
import usePrivateClient from "../../../hooks/usePrivateClient";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const AllReviews = () => {
  const [page, setPage] = useState(0);
  const { loading } = useAuth();

  const privateClient = usePrivateClient();
  const [deleteLoading, setDeleteLoading] = useState([false, ""]);
  const {
    data: meals,
    refetch,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["meals", page],
    enabled: !loading,
    queryFn: async () => {
      const res = await privateClient.get(`/meals/admin?offset=${page * 10}`);
      return res.data;
    },
    keepPreviousData: false,
  });

  const handleDelete = (id) => {
    setDeleteLoading([true, id]);
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
        privateClient.delete(`/meals/${id}`).then(({ data }) => {
          if (data.deletedCount > 0) {
            refetch();
            setDeleteLoading([false, id]);
            Swal.fire({
              title: "Success",
              text: "Meal delete successfully!",
              icon: "success",
              confirmButtonText: "Done",
            });
          }
        });
      } else setDeleteLoading([false, id]);
    });
  };
  return (
    <div className="w-full lg:p-6 px-2 pb-2 lg:mx-0">
      <h2 className="text-2xl lg:mt-0 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        All reviews
      </h2>
      <div className="overflow-x-auto rounded-md border">
        <table className="table table-xs md:table-md table-pin-rows table-pin-cols table-zebra bg-white">
          <thead>
            <tr>
              <th></th>
              <td>Title</td>
              <td>Likes</td>
              <td>Reviews Count</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {!isFetching && meals?.meals?.length < 1 && (
              <tr>
                <td colSpan={5} className="text-center text-error">
                  No Review Data found.
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
              meals?.meals?.map((meal, idx) => {
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
                    <td>{reviews?.length}</td>
                    <td className="flex gap-2 w-fit">
                      <button
                        disabled={deleteLoading[0] && deleteLoading[1] === _id}
                        onClick={() => handleDelete(_id)}
                        title="delete"
                        className="btn text-white disabled:text-primary btn-error btn-xs  md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
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
      <div className="mx-auto w-fit my-6">
        <div className="join">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
            className="join-item btn btn-sm md:btn-md"
          >
            «
          </button>
          {Array.from({ length: Math.ceil(meals?.mealsCount / 10) }).map(
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
                page < Math.ceil(meals?.mealsCount / 10) - 1
              ) {
                setPage((old) => old + 1);
              }
            }}
            disabled={
              isPreviousData || page >= Math.ceil(meals?.mealsCount / 10) - 1
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

export default AllReviews;
