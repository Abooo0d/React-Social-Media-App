import { useGetUsers } from "@/lib/React-Query/queriesAndMutation";
import ChatContact from "./ChatContact";
import Loader from "./Loader";
import { useChatsContext } from "@/Context/ChatsContext";
import { useLocation } from "react-router-dom";
const ChatsBar = () => {
  const { data: users, isPending: isLoadingUsers } = useGetUsers();
  const { receiverId } = useChatsContext();
  const { pathname } = useLocation();
  return (
    <div
      className={`w-full xl:max-w-[350px] xl:py-10 px-5 ${
        pathname === "/chats" ? " flex " : " hidden xl:flex "
      } flex-col gap-4 border-r-small border-gray-900 `}
    >
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
        <>
          <div className="flex flex-col gap-4 px-4 py-4 w-full rounded-lg max-w-5xl justify-center">
            {users?.pages[0]?.documents.map((user, index) => (
              <>
                <ChatContact
                  userData={user}
                  receiverId={receiverId}
                  key={index + "Abood "}
                />
                <hr
                  className={`w-[80%] mx-auto my-2 h-2 block border-dark-4`}
                  key={index + "hr"}
                />
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatsBar;
