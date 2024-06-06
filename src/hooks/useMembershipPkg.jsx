const useMembershipPkg = () => {
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
  const findPkg = (pkgName) => packages.find((pkg) => pkg.name === pkgName);
  return [packages, findPkg];
};

export default useMembershipPkg;
