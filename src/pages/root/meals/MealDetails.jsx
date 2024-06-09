import { useParams } from "react-router-dom";
import useMeal from "../../../hooks/useMeal";
import Rating from "react-rating";
import { MdOutlineRateReview, MdStar, MdStarBorder } from "react-icons/md";
import Loading from "../../../components/Loading";
import { BsCartPlus } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { Autoplay, EffectCards } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import getRandomColor from "../../../utils/getRandomColor";
import usePrivateClient from "../../../hooks/usePrivateClient";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MealDetails = () => {
  const privateClient = usePrivateClient();
  const { id } = useParams();
  const [meal, refetch, mealLoading] = useMeal(id);
  const { register, handleSubmit, reset } = useForm();
  const [reviewLoading, setReviewLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);

  if (mealLoading || !meal) {
    return <Loading />;
  }
  const {
    image,
    title,
    username,
    description,
    ingredients,
    time,
    rating,
    reviews,
    likes,
  } = meal;

  const handleLike = async () => {
    try {
      setLikeLoading(true);
      const res = await privateClient.put(`/meals/${id}/like`);
      if (res.data.modifiedCount > 0) {
        refetch();
        setLikeLoading(false);
      }
    } catch (err) {
      setLikeLoading(false);
      toast.error(err.response.data.message);
    }
  };

  const handleReview = handleSubmit(async ({ review }) => {
    setReviewLoading(true);
    const res = await privateClient.put(`/meals/${id}/review`, { review });
    if (res.data.modifiedCount > 0) {
      refetch();
      reset();
      Swal.fire({
        title: "Success",
        text: "Review successfully!",
        icon: "success",
        confirmButtonText: "Done",
      });
    }
    setReviewLoading(false);
  });

  const handleRequest = async () => {
    try {
      setRequestLoading(true);
      const requestedMeal = { mealId: id, status: "Pending" };
      const res = await privateClient.post("/meals/request", requestedMeal);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "Success",
          text: "Meal request successfully!",
          icon: "success",
          confirmButtonText: "Done",
        });
      }
      setRequestLoading(false);
    } catch (err) {
      setRequestLoading(false);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="p-2 lg:p-0 lg:py-10">
      <div className="rounded-lg overflow-hidden flex flex-col lg:flex-row border border-gray-100 shadow-sm bg-gradient-to-bl from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
        <img
          src={image}
          className="lg:w-1/2 m-4 dark:bg-gray-400 rounded-lg aspect-video object-cover"
        />
        <div className="flex-1">
          <div className="p-3 flex-1 pb-5 dark:bg-gray-600 dark:text-white grow h-full flex flex-col">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <div className="flex flex-col gap-2 mt-3 grow">
              <p>{description}</p>
              <p>
                <b>Distributor : </b>
                {username}
              </p>
              <p>
                <b>Ingredients : </b>
                {ingredients}
              </p>
              <p>
                <b>Rating :</b>
                <Rating
                  className="translate-y-1"
                  readonly
                  initialRating={rating}
                  emptySymbol={<MdStarBorder />}
                  fullSymbol={<MdStar />}
                />
              </p>
              <p>
                <b>Time : </b> {time}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                className="btn btn-primary mt-4 dark:bg-blue-500 disabled:text-primary"
                onClick={handleLike}
                disabled={likeLoading}
              >
                Like ({likes || 0})
                {likeLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <>
                    <BiLike />
                  </>
                )}
              </button>
              <button
                disabled={requestLoading}
                onClick={handleRequest}
                className="btn btn-info mt-4 dark:bg-blue-500 disabled:text-primary"
              >
                Request
                {requestLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <>
                    <BsCartPlus />
                  </>
                )}
              </button>
            </div>
            <div className="mt-6">
              <b className="mb-6 block">Reviews ({reviews.length || 0})</b>
              <div className="px-10 md:px-16 py-4 lg:p-0">
                <Swiper
                  data-aos="zoom-in"
                  autoplay={{
                    delay: 900,
                    disableOnInteraction: false,
                  }}
                  effect={"cards"}
                  grabCursor={true}
                  modules={[Autoplay, EffectCards]}
                  className="w-full lg:w-[300px] drop-shadow-md"
                >
                  {reviews?.map(({ email, review }, idx) => (
                    <SwiperSlide
                      key={idx}
                      style={{ backgroundColor: getRandomColor() }}
                      className="rounded-lg"
                    >
                      <div className="p-2 bg-black/30 text-white">
                        <h1 className="border-b border-white pb-2 mb-2 font-bold text-center">
                          {email}
                        </h1>
                        <h1>{review}</h1>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <form onSubmit={handleReview} className="w-full mt-4 md:mt-6">
              <div className="join w-full flex">
                <div className="grow">
                  <div className="w-full">
                    <input
                      className="input input-bordered join-item border-primary w-full"
                      type="text"
                      placeholder="Enter your review"
                      {...register("review", {
                        required: "Please enter review",
                      })}
                    />
                  </div>
                </div>
                <div className="indicator">
                  <button
                    disabled={reviewLoading}
                    type="submit"
                    className="btn join-item btn-primary disabled:text-primary"
                  >
                    <span className="hidden md:block">Add Review</span>{" "}
                    {reviewLoading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      <>
                        <MdOutlineRateReview />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
