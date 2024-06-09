import useUpcomingMeals from "../../../../hooks/useUpcomingMeals";
import { RiDeleteBin6Fill } from "react-icons/ri";
import usePrivateClient from "../../../../hooks/usePrivateClient";
import Swal from "sweetalert2";
import Loading from "../../../../components/Loading";
import Modal from "react-modal";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Rating from "react-rating";
import {
  MdOutlineAddCircleOutline,
  MdOutlineDriveFileRenameOutline,
  MdStar,
  MdStarBorder,
} from "react-icons/md";
import imgBB from "../../../../utils/imgBB";
import { AiOutlineClose } from "react-icons/ai";
import { GrCloudUpload } from "react-icons/gr";
const UpcomingMeals = () => {
  const [sort, setSort] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meals, refetch, mealLoading] = useUpcomingMeals(sort);
  const privateClient = usePrivateClient();
  const { user } = useAuth();
  const [imgTitle, setImgTitle] = useState(null);
  const [rating, setRating] = useState(3);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState([false, ""]);
  const [publishLoading, setPublishLoading] = useState([false, ""]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: user?.email,
      username: user?.displayName,
    },
  });

  const handleFormSubmit = handleSubmit(async (meal) => {
    setLoading(true);
    setIsModalOpen(false);
    meal.rating = rating;
    meal.reviews = [
      {
        email: user.email,
        review: meal.reviews,
      },
    ];
    const url = await imgBB(meal.image[0]);
    meal.image = url;
    const res = await privateClient.post("/meals/upcoming", meal);
    if (res.data.insertedId) {
      reset();
      refetch();
      Swal.fire({
        title: "Success",
        text: "Upcoming meal insert successfully!",
        icon: "success",
        confirmButtonText: "Done",
      });
    }
    setLoading(false);
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
        privateClient.delete(`/meals/upcoming/${id}`).then(({ data }) => {
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

  const handlePublish = (id) => {
    setPublishLoading([true, id]);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Publish it!",
    }).then((result) => {
      if (result.isConfirmed) {
        privateClient.put(`/meals/upcoming/${id}/publish`).then(({ data }) => {
          if (data.insertedId) {
            refetch();
            setPublishLoading([false, id]);
            Swal.fire({
              title: "Success",
              text: "Meal Publish successfully!",
              icon: "success",
              confirmButtonText: "Done",
            });
          }
        });
      } else setPublishLoading([false, id]);
    });
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: "0",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="lg:p-6 pt-6 px-2 pb-2 lg:mx-0 bg-gradient-to-bl from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
      <h2 className="text-2xl lg:mt-0 lg:mb-8 lg:text-5xl font-semibold text-center mb-4">
        Upcoming Meals
      </h2>
      <div className="flex items-center justify-center gap-4 mb-4 lg:mb-8">
        <select
          onChange={(e) => {
            setSort(e.target.value);
            refetch();
          }}
          defaultValue="default"
          className="select bg-green-400 rounded-lg outline-none select-sm md:select-md text-white dark:bg-gray-700 dark:text-white dark:border-gray-400"
        >
          <option disabled value="default">
            Sort
          </option>
          <option value="likes">Likes</option>
          <option value="reviews">Reviews</option>
        </select>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="btn btn-primary btn-sm md:btn-md flex items-center justify-center gap-1"
        >
          <span className="hidden md:block">Add Upcoming meal</span>
          <MdOutlineAddCircleOutline className="text-xl" />
        </button>
      </div>
      <div className="overflow-x-auto rounded-md border -z-10">
        <table className="table table-xs md:table-md table-pin-rows table-pin-cols table-zebra bg-white">
          <thead>
            <tr className="-z-0">
              <th></th>
              <td>Title</td>
              <td>Likes</td>
              <td>Reviews</td>
              <td>Distributor</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6}>
                  <Loading className="my-0" />
                </td>
              </tr>
            )}
            {!mealLoading && meals?.length < 1 && !loading && (
              <tr>
                <td colSpan={6} className="text-center text-error">
                  No Upcoming Meals Data found.
                </td>
              </tr>
            )}
            {mealLoading ? (
              <tr>
                <td colSpan={6}>
                  <Loading className="my-0" />
                </td>
              </tr>
            ) : (
              meals?.map((meal, idx) => {
                const { _id, title, likes, reviews, username } = meal;
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
                    <td>{reviews?.length}</td>
                    <td>{username}</td>
                    <td className="flex gap-2 w-fit">
                      <button
                        disabled={
                          publishLoading[0] && publishLoading[1] === _id
                        }
                        onClick={() => handlePublish(_id)}
                        title="publish"
                        className="btn text-white btn-info btn-xs md:btn-sm dark:bg-gray-700 dark:text-white dark:border-gray-400"
                      >
                        {publishLoading[0] && publishLoading[1] === _id ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <GrCloudUpload />
                        )}
                      </button>
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
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <Modal
        style={customStyles}
        isOpen={isModalOpen}
        contentLabel="Upcoming meal Modal"
      >
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="h-screen p-6 overflow-scroll bg-gradient-to-br from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500"
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="btn text-black rounded-full aspect-square px-0 btn-sm btn-ghost dark:bg-gray-700 dark:text-white dark:border-gray-400"
          >
            <AiOutlineClose />
          </button>
          <h2 className="text-2xl lg:mt-0 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
            Upcoming Meal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
            <div>
              <label
                className={`input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400 ${
                  errors.image ? "border-red-500" : ""
                }`}
              >
                Image
                {imgTitle ? (
                  <span className="mr-2">{imgTitle}</span>
                ) : (
                  <span className="mr-2 text-gray-400">Enter meal image</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: "Please upload an image",
                    onChange: (e) => {
                      setImgTitle(e.target.files[0].name);
                    },
                  })}
                  className="hidden"
                />
              </label>
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>
            <div>
              <label
                className={`input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400 ${
                  errors.title ? "border-red-500" : ""
                }`}
              >
                Title
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter book name"
                  {...register("title", { required: "Please enter a title" })}
                />
              </label>
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label
                className={`input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400 ${
                  errors.category ? "border-red-500" : ""
                }`}
              >
                Category
                <select
                  defaultValue="default"
                  {...register("category", {
                    required: "Please select a category",
                    validate: (value) =>
                      value !== "default" || "Please select a category",
                  })}
                  className="grow border-0 outline-0 bg-transparent dark:bg-gray-500 dark:text-gray-200"
                >
                  <option disabled value="default">
                    Select a Category
                  </option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </label>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>
            <div>
              <label
                className={`input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400 ${
                  errors.ingredients ? "border-red-500" : ""
                }`}
              >
                Ingredients
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter ingredients"
                  {...register("ingredients", {
                    required: "Please enter ingredients",
                  })}
                />
              </label>
              {errors.ingredients && (
                <p className="text-red-500">{errors.ingredients.message}</p>
              )}
            </div>
            <div>
              <label
                className={`input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400 ${
                  errors.price ? "border-red-500" : ""
                }`}
              >
                Price
                <input
                  type="number"
                  min={1}
                  className="grow"
                  placeholder="Enter price"
                  {...register("price", {
                    valueAsNumber: true,
                    required: "Please enter a price",
                  })}
                />
              </label>
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400">
              Rating
              <Rating
                onChange={setRating}
                initialRating={rating}
                className="text-xl translate-y-[2px]"
                emptySymbol={<MdStarBorder />}
                fullSymbol={<MdStar />}
              />
            </label>
            <div>
              <label
                className={`input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400 ${
                  errors.time ? "border-red-500" : ""
                }`}
              >
                Time
                <input
                  type="datetime-local"
                  className="grow"
                  placeholder="Enter post time"
                  {...register("time", { required: "Please enter the time" })}
                />
              </label>
              {errors.time && (
                <p className="text-red-500">{errors.time.message}</p>
              )}
            </div>
            <div>
              <label
                className={`input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400 ${
                  errors.reviews ? "border-red-500" : ""
                }`}
              >
                Reviews
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter meal reviews"
                  {...register("reviews", { required: "Please enter reviews" })}
                />
              </label>
              {errors.reviews && (
                <p className="text-red-500">{errors.reviews.message}</p>
              )}
            </div>
            <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400">
              Email
              <input
                type="text"
                className="grow cursor-not-allowed"
                {...register("email")}
                disabled
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400">
              Author
              <input
                type="text"
                className="grow cursor-not-allowed"
                {...register("username")}
                disabled
              />
            </label>
          </div>
          <div>
            <textarea
              {...register("description", {
                required: "Please enter a description",
              })}
              className={`textarea textarea-bordered w-full h-40 my-4 dark:bg-gray-500 dark:border-gray-400 ${
                errors.description ? "border-red-500" : ""
              }`}
              placeholder="Enter description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <button
            disabled={loading}
            className="btn btn-primary w-full"
            type="submit"
          >
            {loading ? (
              <Loading className="my-0 text-primary" />
            ) : (
              <>
                Create <MdOutlineDriveFileRenameOutline />
              </>
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UpcomingMeals;
