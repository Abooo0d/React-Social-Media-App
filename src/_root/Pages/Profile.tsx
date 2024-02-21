import { useUserContext } from "@/Context/AuthContext";
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import { useGetUserProfile } from "@/lib/React-Query/queriesAndMutation";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: userInfo, isPending: isLoading } = useGetUserProfile(id || "");
  console.log(userInfo);
  if (isLoading)
    return (
      <div className="flex flex-1 items-center content-center">
        <Loader />
      </div>
    );
  return (
    <div className="flex flex-1 flex-col py-14 px-5">
      <div className="flex w-full gap-5">
        <img
          src={userInfo?.documents[0].imageUrl}
          alt="Profile Image"
          className="rounded-full mx-4 h-32 w-32"
        />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-2">
              {userInfo?.documents[0].name}
            </h2>
            <p className=" text-light-3 text-md">
              @ {userInfo?.documents[0].username}
            </p>
          </div>
          <div className="flex gap-6 w-full text-lg">
            <div className="">
              <span className="text-light-3 font-bold">200</span> posts
            </div>
            <div>
              <span className="text-light-3 font-bold">200</span> posts
            </div>
            <div>
              <span className="text-light-3 font-bold">200</span> posts
            </div>
          </div>
          <div>
            {userInfo?.documents[0]?.bio === null
              ? "No Bio"
              : userInfo?.documents[0]?.bio}{" "}
          </div>
        </div>
        {user?.id === id ? (
          <Link
            to={`update-profile/${id}`}
            className="bg-dark-4 font-bold h-12 min-w-32 flex rounded-md content-center items-center px-2"
          >
            <img
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
              className="mr-2"
            />
            <span className="text-sm w-full text-center">Edit Profile</span>
          </Link>
        ) : (
          <div className="flex flex-1 gap-4">
            <Button className="bg-primary-500 font-bold ">Follow</Button>
            <Button className="bg-white text-black font-bold ">Message</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
