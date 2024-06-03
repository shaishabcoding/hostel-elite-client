import useProfile from "../../hooks/useProfile";
import Loading from "../../components/Loading";

const Profile = () => {
  const [profile, , loading] = useProfile();
  if (loading) {
    return <Loading />;
  }
  if (!profile) {
    return <div>No profile data available.</div>;
  }
  const { image, name, email, role, mealCount } = profile;
  return (
    <div className="w-full lg:p-6 px-2 pb-2 lg:mx-0 ">
      <h2 className="text-2xl lg:mt-0 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        Profile
      </h2>
      <div className="flex justify-center">
        <div className="flex flex-col w-fit">
          <img
            src={image}
            className="avatar rounded-full w-[200px] mb-6"
            alt={`image of ${name}`}
          />
          <h2 className="text-lg ">
            <span className="font-bold">Name:</span> {name}
          </h2>
          <h2 className="text-lg ">
            <span className="font-bold">Email:</span> {email}
          </h2>
          {role === "admin" ? (
            <>
              <h2 className="text-lg ">
                <span className="font-bold">Number of meals:</span> {mealCount}
              </h2>
            </>
          ) : (
            <>
              <h2 className="text-lg ">
                <span className="font-bold">Role:</span> {role}
              </h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
