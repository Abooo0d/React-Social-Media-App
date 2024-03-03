import { useUserContext } from "@/Context/AuthContext";
import { useChatsContext } from "@/Context/ChatsContext";
import { Models } from "appwrite";
type userCardProps = {
  userData: Models.Document;
  receiverId: string;
};
const ChatContact = ({ userData }: userCardProps) => {
  const { user } = useUserContext();
  const { setReceiverId, setSenderId } = useChatsContext();
  return (
    <div
      className="flex flex-col xl:flex-row justify-center xl:justify-start items-center h-[100px] w-[100px] xl:h-full xl:w-full 
                gap-3 xl:gap-5 xl:content-start xl:items-start cursor-pointer border-small border-dark-4 p-2 rounded-lg
        hover:border-primary-500 duration-200 xl:border-none"
      onClick={() => {
        setReceiverId(userData.$id);
        setSenderId(user.id);
      }}
    >
      <img
        src={userData?.imageUrl}
        alt="User Image"
        className="rounded-full w-[30px] h-[30px] xl:w-[60px] xl:h-[60px]"
      />
      <div className="flex flex-col">
        <p className="hidden xl:block body-bold text-center mb-2">
          {userData.name}
        </p>
        <p className="small-regular text-light-3 text-center max-w-[90px] overflow-hidden">
          @{userData.username}
        </p>
      </div>
    </div>
  );
};

export default ChatContact;
