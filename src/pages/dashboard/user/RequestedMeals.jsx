import useRequestedMeals from "../../../hooks/useRequestedMeals";
import Loading from "../../../components/Loading";
import { RiDeleteBin6Fill } from "react-icons/ri";

const RequestedMeals = () => {
  const [meals, , loading] = useRequestedMeals();
  console.log(meals);
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
                  No meals Data found.
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
                const { _id, title, likes, reviews, status } = meal;
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
                    <td>{reviews.length}</td>
                    <td>{status}</td>
                    <td>
                      <button
                        // disabled={deleteLoading[0] && deleteLoading[1] === _id}
                        // onClick={() => handleDelete(_id)}
                        title="cancel"
                        className="btn text-white disabled:text-black btn-error btn-xs  md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
                      >
                        {/* {deleteLoading[0] && deleteLoading[1] === _id ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : ( */}
                        <RiDeleteBin6Fill />
                        {/* )} */}
                      </button>
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
