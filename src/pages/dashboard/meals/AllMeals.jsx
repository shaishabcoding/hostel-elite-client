import { Link } from "react-router-dom";
import useMeals from "../../../hooks/useMeals";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
const AllMeals = () => {
  const [meals] = useMeals();

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
            console.log(meal);
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
                <td>{reviews.length}</td>
                <td>{username}</td>
                <td className="flex gap-2 w-fit">
                  <button
                    title="update"
                    className="btn text-white btn-info btn-xs md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
                  >
                    <BiSolidEdit />
                  </button>
                  <button
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
