import Loader from "@/components/Shared/Loader";
import UserCard from "@/components/Shared/UserCard";
import { useGetUsers } from "@/lib/React-Query/queriesAndMutation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const AllUsers = () => {
  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isPending: isLoading,
  } = useGetUsers();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (hasNextPage) fetchNextPage();
  }, [inView]);
  return (
    <div className="explore-container">
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h2 className="h3-bold lg:h2-bold">All Users</h2>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex gap-5 px-4 w-full rounded-lg max-w-5xl">
            {users?.pages[0]?.documents.map((user, index) => (
              <UserCard user={user} key={index} />
            ))}
          </div>
          <>
            {!hasNextPage && (
              <div ref={ref} className="mt-10">
                <Loader />
              </div>
            )}
          </>
        </>
      )}
    </div>
  );
};

export default AllUsers;
