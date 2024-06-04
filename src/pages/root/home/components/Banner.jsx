import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { Autoplay, EffectCards } from "swiper/modules";
import getRandomColor from "../../../../utils/getRandomColor";
import { FaSearch } from "react-icons/fa";

const Banner = () => {
  // Todo: change images
  const images = [
    "https://i.ibb.co/LnG8p9d/The-Catcher-in-the-Rye.jpg",
    "https://i.ibb.co/0JjBcZT/The-Great-Gatsby.jpg",
    "https://i.ibb.co/DbPDd0Y/To-Kill-a-Mockingbird.jpg",
    "https://i.ibb.co/Pg4F2gG/1984.jpg",
    "https://i.ibb.co/JRRZK27/The-Hobbit.jpg",
  ];
  return (
    <div className="hero min-h-screen my-1 lg:rounded-lg lg:mt-6 lg:mb-10 md:py-10 bg-gradient-to-bl from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
      <div className="hero-content flex-col lg:flex-row-reverse lg:p-28 gap-4 lg:gap-20 overflow-hidden">
        <Swiper
          autoplay={{
            delay: 900,
            disableOnInteraction: false,
          }}
          effect={"cards"}
          grabCursor={true}
          modules={[Autoplay, EffectCards]}
          className="w-[220px] md:w-[500px] lg:w-[300px] drop-shadow-md"
        >
          {images.map((image, idx) => (
            <SwiperSlide
              key={idx}
              style={{ backgroundColor: getRandomColor() }}
              className="p-2 rounded-lg"
            >
              <img
                src={image}
                className="w-full aspect-square md:aspect-video lg:aspect-square rounded-lg drop-shadow-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="md:px-10 lg:pl-0">
          <h1
            data-aos="fade-up"
            className="lg:text-5xl mt-4 lg:mt-0 text-2xl font-bold"
          >
            Welcome to <span className="text-sky-600">Hostel Elite</span>!
          </h1>
          <p data-aos="fade-down" data-aos-delay="300" className="lg:my-6 my-4">
            Your premier University Hostel Management System! Simplify
            administration with our all-in-one platform designed to efficiently
            manage student meals and collect insightful food reviews. Enhance
            the hostel experience with our intuitive interface, ensuring
            seamless operations and improved student satisfaction. Join Hostel
            Elite in creating a well-organized and supportive living environment
            for our university community.
          </p>
          <div className="join">
            <div>
              <div>
                <input
                  className="input input-bordered join-item border-primary"
                  type="text"
                  placeholder="Search for foods..."
                />
              </div>
            </div>
            <div className="indicator">
              <button className="btn join-item btn-primary">
                Search <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
