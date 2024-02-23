import { useGetUsers } from "@/lib/React-Query/queriesAndMutation";
import UserCard from "./UserCard";
import Loader from "./Loader";

const RightBar = () => {
  const { data: users, isPending: isLoading } = useGetUsers();
  return (
    <div className="max-w-[550px] bg-dark-2 py-10 px-5 hidden flex-col gap-4 xl:flex">
      <h2 className="h3-bold md:h2-bold w-full mb-10">Top Creator</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex gap-4 px-4 w-full rounded-lg max-w-5xl flex-wrap content-start">
          {users?.pages[0]?.documents.map((user, index) => (
            <UserCard user={user} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RightBar;
