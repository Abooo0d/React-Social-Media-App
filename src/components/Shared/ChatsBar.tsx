import { useGetUsers } from "@/lib/React-Query/queriesAndMutation";
import ChatContact from "./ChatContact";
import Loader from "./Loader";
import { useChatsContext } from "@/Context/ChatsContext";
const ChatsBar = () => {
  const { data: users, isPending: isLoadingUsers } = useGetUsers();
  const { receiverId } = useChatsContext();
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
              <ChatContact
                userData={user}
                key={"message" + index}
                receiverId={receiverId}
              />
              <hr
                className={`${
                  user.$id === receiverId
                    ? `border-primary-500 duration-200`
                    : `border-dark-4`
                } w-[80%] mx-auto my-2 h-2`}
                key={index + "hr"}
              />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatsBar;
