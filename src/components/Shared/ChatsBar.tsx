import { useGetUsers } from "@/lib/React-Query/queriesAndMutation";
import ChatContact from "./ChatContact";
65;
import Loader from "./Loader";
const ChatsBar = () => {
  const { data: users, isPending: isLoadingUsers } = useGetUsers();
  return (
    <div className="max-w-[350px] py-10 px-5 hidden flex-col gap-4 xl:flex border-r-small border-gray-900">
      <div className="flex gap-5 justify-start items-center mb-10">
        <img
          src="/assets/icons/chat.svg"
          alt="chat image"
          width={50}
          height={50}
        />
        <h2 className="h3-bold md:h2-bold w-full ">All Chats</h2>
      </div>
      {isLoadingUsers ? (
        <Loader />
      ) : (
        <div className="flex gap-4 px-4 w-full rounded-lg max-w-5xl flex-wrap content-start">
          {users?.pages[0]?.documents.map((user, index) => (
            <>
              <ChatContact user={user} key={index} />
              <hr className="border-gray-900 w-[80%] mx-auto my-4" />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatsBar;
