import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import usePrivateClient from "../../../hooks/usePrivateClient";
import imgBB from "../../../utils/imgBB";
import {
  MdOutlineDriveFileRenameOutline,
  MdStar,
  MdStarBorder,
} from "react-icons/md";
import { useState } from "react";
import Rating from "react-rating";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

const AddMeal = () => {
  const { user } = useAuth();
  const [imgTitle, setImgTitle] = useState(null);
  const [rating, setRating] = useState(3);
  const privateClient = usePrivateClient();
  const [loading, setLoading] = useState(false);

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
    meal.rating = rating;
    meal.reviews = [
      {
        email: user.email,
        review: meal.reviews,
      },
    ];
    const url = await imgBB(meal.image[0]);
    meal.image = url;
    const res = await privateClient.post("/meals", meal);
    if (res.data.insertedId) {
      reset();
      Swal.fire({
        title: "Success",
        text: "New meal insert successfully!",
        icon: "success",
        confirmButtonText: "Done",
      });
    }
    setLoading(false);
  });
  return (
    <div className="w-full lg:p-6 pt-6 px-2 pb-2 lg:mx-0 rounded-lg border bg-gradient-to-bl from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
      <h2 className="text-2xl lg:mt-0 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        New Meal
      </h2>
      <div className="w-full lg:px-12 mx-auto">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                  errors.likes ? "border-red-500" : ""
                }`}
              >
                Likes
                <input
                  type="number"
                  min={0}
                  className="grow"
                  placeholder="Enter meal likes"
                  {...register("likes", {
                    valueAsNumber: true,
                    required: "Please enter the number of likes",
                  })}
                />
              </label>
              {errors.likes && (
                <p className="text-red-500">{errors.likes.message}</p>
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
            <label
              className={`input mt-4 input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400 ${
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
      </div>
    </div>
  );
};

export default AddMeal;
