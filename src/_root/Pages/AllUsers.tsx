import useDebounce from "@/Hooks/useDebounce";
import Loader from "@/components/Shared/Loader";
import UserCard from "@/components/Shared/UserCard";
import { Input } from "@/components/ui/input";
import {
  useGetUsers,
  useSearchUser,
} from "@/lib/React-Query/queriesAndMutation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const AllUsers = () => {
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 500);
  const { data: searchUsers, isPending: isLoadingSearchUsers } =
    useSearchUser(debounceValue);
  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isPending: isLoading,
  } = useGetUsers();
  const { ref, inView } = useInView();
  const showSearchResult = searchValue !== "";
  useEffect(() => {
    if (hasNextPage) fetchNextPage();
  }, [inView]);
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold lg:h2-bold">Search Post</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="Search Icon"
          />
          <Input
            type="text"
            placeholder="Search By Username"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h2 className="h3-bold lg:h2-bold">All Users</h2>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {showSearchResult ? (
            <>
              {isLoadingSearchUsers ? (
                <Loader />
              ) : searchUsers?.documents.length === 0 ? (
                <p>No Results </p>
              ) : (
                <div className="users-container">
                  {searchUsers?.documents?.map((user, index) => (
                    <UserCard user={user} key={index} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="users-container">
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
        </>
      )}
    </div>
  );
};

export default AllUsers;

<></>;
