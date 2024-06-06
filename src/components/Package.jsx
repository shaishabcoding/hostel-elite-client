import getRandomColor from "../utils/getRandomColor";
import { SlFire } from "react-icons/sl";

const Package = ({ pkg }) => {
  return (
    <div
      style={{ background: getRandomColor() }}
      className={`rounded-lg flex-1`}
    >
      <div className="bg-black/30 h-full rounded-lg relative">
        {pkg.hot && (
          <div className="badge mx-auto bg-red-400 text-white flex gap-1 border-2 border-red-400 absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2">
            Hot <SlFire />
          </div>
        )}
        <div
          className={`p-4 h-full text-white ${
            pkg.hot && "border-4 border-red-400"
          } rounded-lg`}
        >
          <h2 className="font-bold text-lg lg:text-2xl">{pkg.name}</h2>
          <p className="border-b border-white pb-2 mb-2">
            ${pkg.price} / month
          </p>
          <ol className="list-disc pl-6">
            {pkg.lists.map((list, idx) => (
              <li key={idx}>{list}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Package;
