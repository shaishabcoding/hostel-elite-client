import { SlFire } from "react-icons/sl";
import getRandomColor from "../../../../utils/getRandomColor";
import { Link } from "react-router-dom";

const Membership = () => {
  const packages = [
    {
      name: "Silver",
      price: 10,
      lists: ["Access to basic features", "Email support", "Community access"],
      hot: false,
    },
    {
      name: "Platinum",
      price: 30,
      lists: [
        "Access to all Gold features",
        "24/7 phone support",
        "VIP community access",
        "Monthly webinars",
      ],
      hot: true,
    },
    {
      name: "Gold",
      price: 20,
      lists: [
        "Access to all Silver features",
        "Priority email support",
        "Exclusive content",
      ],
      hot: false,
    },
  ];

  return (
    <div className="px-4 lg:px-0">
      <h2 className="text-2xl lg:mt-0 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        Membership
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10 mb-10 lg:mt-20">
        {packages.map((pkg, idx) => (
          <Link
            to={`/checkout/${pkg.name}`}
            key={idx}
            className="hover:scale-105 transition"
          >
            <div
              style={{ background: getRandomColor() }}
              className={`rounded-lg ${
                pkg.hot ? "lg:scale-110" : "lg:scale-90"
              }`}
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Membership;
