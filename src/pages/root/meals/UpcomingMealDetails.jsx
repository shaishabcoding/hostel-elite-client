import { useParams } from "react-router-dom";
import Rating from "react-rating";
import { MdStar, MdStarBorder } from "react-icons/md";
import Loading from "../../../components/Loading";
import { BiLike } from "react-icons/bi";
import { Autoplay, EffectCards } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import getRandomColor from "../../../utils/getRandomColor";
import usePrivateClient from "../../../hooks/usePrivateClient";
import { useState } from "react";
import { toast } from "react-toastify";
import useUpcomingMeal from "../../../hooks/useUpcomingMeal";
import { useNavigate } from "react-router-dom";

const UpcomingMealDetails = () => {
  const privateClient = usePrivateClient();
  const { id } = useParams();
  const [meal, refetch, mealLoading] = useUpcomingMeal(id);
  const [likeLoading, setLikeLoading] = useState(false);
  const navigate = useNavigate();

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
      const res = await privateClient.put(`/meals/upcoming/${id}/like`);
      if (res.data.modifiedCount > 0) {
        refetch();
        setLikeLoading(false);
      } else if (res.data.insertedId) {
        navigate("/meal/" + res.data.insertedId);
      }
    } catch (err) {
      setLikeLoading(false);
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
            <h2 className="text-2xl md:text-4xl md:mb-4 font-semibold">
              {title}
            </h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMealDetails;
