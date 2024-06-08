const NewsLetter = () => {
  return (
    <div
      className="w-full bg-cover bg-no-repeat text-center bg-center lg:rounded-lg overflow-hidden"
      style={{
        backgroundImage: "url('https://i.ibb.co/FYnhyD0/banner.jpg')",
      }}
    >
      <div className="bg-black/30 w-full flex flex-col items-center justify-center h-full text-white py-20 px-10">
        <h3 className="text-xl font-bold md:text-3xl lg:text-5xl mb-4 md:mb-10">
          Get The Latest News
        </h3>
        <div className="flex flex-col md:flex-row join join-vertical md:join-horizontal text-black dark:text-white">
          <label className="input join-item input-bordered flex items-center gap-2 dark:bg-gray-500 dark:border-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow"
              placeholder="Enter your email"
            />
          </label>
          <button className="btn btn-primary join-item dark:bg-blue-800 dark:border-gray-400">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
