import { Link } from "react-router-dom";
import useMeals from "../../../hooks/useMeals";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import usePrivateClient from "../../../hooks/usePrivateClient";
import Swal from "sweetalert2";
const AllMeals = () => {
  const [meals, refetch] = useMeals();
  const privateClient = usePrivateClient();
  console.log(meals);
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
        privateClient.delete(`/meals/${id}`).then(({ data }) => {
          if (data.deletedCount > 0) {
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
  return (
    <div className="overflow-x-auto mx-4 lg:mx-0 rounded-md border">
      <table className="table table-xs md:table-md table-pin-rows table-pin-cols table-zebra">
        <thead>
          <tr>
            <th></th>
            <td>Title</td>
            <td>Likes</td>
            <td>Reviews</td>
            <td>Distributor</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {meals?.map((meal, idx) => {
            const { _id, title, likes, reviews, username } = meal;
            return (
              <tr
                key={_id}
                className="dark:bg-gray-400 dark:text-white dark:even:text-gray-700"
              >
                <th className="dark:text-black dark:odd:bg-gray-400">
                  {idx + 1}
                </th>
                <td>{title}</td>
                <td>{likes}</td>
                <td>{reviews?.length}</td>
                <td>{username}</td>
                <td className="flex gap-2 w-fit">
                  <Link
                    className="grid w-full"
                    to={`/dashboard/meals/edit/${_id}`}
                  >
                    <button
                      title="update"
                      className="btn text-white btn-info btn-xs md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
                    >
                      <BiSolidEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(_id)}
                    title="delete"
                    className="btn text-white btn-error btn-xs  md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
                  >
                    <RiDeleteBin6Fill />
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllMeals;
