import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import { useGetUsers } from "@/lib/React-Query/queriesAndMutation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const { data: users, fetchNextPage, hasNextPage } = useGetUsers();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (hasNextPage) fetchNextPage();
  }, [inView]);
  console.log(users?.pages[0]?.documents);
  return (
    <div className="explore-container">
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h2 className="h3-bold lg:h2-bold">All Users</h2>
      </div>
      <div className="flex gap-5 px-4 w-full rounded-lg max-w-5xl">
        {users?.pages[0]?.documents.map((user, index) => (
          <Link
            className="flex w-[300px] flex-col gap-5 py-6 flex-center border border-gray-900 rounded-lg cursor-pointer"
            key={index}
            to={`/profile/${user.$id}`}
          >
            <img
              src={user?.imageUrl}
              alt="User Image"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold text-center mb-2"> {user.name}</p>
              <p className="small-regular text-light-3 text-center">
                @{user.username}
              </p>
            </div>
            <Button className="shad-button_primary whitespace-nowrap">
              Follow
            </Button>
          </Link>
        ))}
      </div>
      {!hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
