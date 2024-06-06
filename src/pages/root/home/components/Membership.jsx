import { Link } from "react-router-dom";
import useMembershipPkg from "../../../../hooks/useMembershipPkg";
import Package from "../../../../components/Package";

const Membership = () => {
  const [packages] = useMembershipPkg();

  return (
    <div className="px-4 lg:px-0">
      <h2 className="text-2xl lg:mt-0 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        Membership
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-3 gap-4 lg:gap-10 mb-10 lg:mt-20">
        {packages.map((pkg, idx) => (
          <Link
            to={`/checkout/${pkg.name}`}
            key={idx}
            className="hover:scale-105 transition p-4 md:p-0"
          >
            <div className={`${pkg.hot ? "lg:scale-110" : "lg:scale-90"}`}>
              <Package pkg={pkg} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Membership;
