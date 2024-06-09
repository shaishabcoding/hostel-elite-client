import { MdStar, MdStarBorder } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Rating from "react-rating";
import { Link } from "react-router-dom";

const MealCard = ({ meal, url }) => {
  const { title, image, rating, price, _id, category } = meal;
  return (
    <div className="rounded-lg h-full overflow-hidden flex flex-col border-2 border-gray-400 shadow-sm bg-gradient-to-bl from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
      <div className="relative border-b-2 border-gray-400">
        <img src={image} className="w-full aspect-video bg-gray-200" />
        <div className="absolute top-3 right-3 flex gap-2">
          <p className="bg-green-200 rounded-md px-2 text-sm border border-gray-400">
            {category}
          </p>
        </div>
      </div>
      <div className="p-3 pb-5 dark:bg-gray-600 dark:text-white grow flex flex-col">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p>
          Rating :
          <Rating
            className="translate-y-[3px] translate-x-1"
            readonly
            initialRating={rating}
            emptySymbol={<MdStarBorder />}
            fullSymbol={<MdStar />}
          />
        </p>
        <p className="mb-3">Price : ${price}</p>
        <div className="grid gap-3">
          <Link className="grid w-full" to={`${url}${_id}`}>
            <button className="btn btn-accent btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400">
              View Details <TbListDetails />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
