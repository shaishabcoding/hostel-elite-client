const Loading = ({ className }) => {
  return (
    <div
      className={`m-6 text-center flex items-center justify-center gap-2 dark:text-white ${className}`}
    >
      <span className="loading loading-infinity loading-lg"></span> loading
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
};

export default Loading;
