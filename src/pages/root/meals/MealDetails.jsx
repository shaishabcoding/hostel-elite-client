import { useParams } from "react-router-dom";
import useMeal from "../../../hooks/useMeal";
import Rating from "react-rating";
import { MdStar, MdStarBorder } from "react-icons/md";
import Loading from "../../../components/Loading";
import { BsCartPlus } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { Autoplay, EffectCards } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import getRandomColor from "../../../utils/getRandomColor";

const MealDetails = () => {
  const { id } = useParams();
  const [meal, refetch, loading] = useMeal(id);
  if (loading || !meal) {
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
  } = meal;

  return (
    <div className="p-2 lg:p-0 lg:py-10">
      <div className="rounded-lg overflow-hidden flex flex-col lg:flex-row border border-gray-100 shadow-sm">
        <img
          src={image}
          className="flex-1 p-4 dark:bg-gray-400 bg-gray-200 aspect-video object-cover"
        />
        <div className="flex-1">
          <div className="p-3 flex-1 pb-5 bg-white dark:bg-gray-600 dark:text-white grow h-full flex flex-col">
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
              <button className="btn btn-primary mt-4 dark:bg-blue-500">
                Like <BiLike />
              </button>
              <button className="btn btn-info mt-4 dark:bg-blue-500">
                Request <BsCartPlus />
              </button>
            </div>
            <div className="mt-6">
              <b className="mb-6 block">Reviews</b>
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
                  {reviews.map(({ email, review }, idx) => (
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

export default MealDetails;
