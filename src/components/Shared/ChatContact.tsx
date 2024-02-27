import { useUserContext } from "@/Context/AuthContext";
import { useChatsContext } from "@/Context/ChatsContext";
import { Models } from "appwrite";
type userCardProps = {
  userData: Models.Document;
  receiverId: string;
};
const ChatContact = ({ userData, receiverId }: userCardProps) => {
  const { user } = useUserContext();
  const { setReceiverId, setSenderId } = useChatsContext();
  return (
    <div
      className="flex w-full gap-5 content-start items-start cursor-pointer"
      onClick={() => {
        setReceiverId(userData.$id);
        setSenderId(user.id);
      }}
    >
      <img
        src={userData?.imageUrl}
        alt="User Image"
        width={60}
        height={60}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <p className="body-bold text-center mb-2"> {userData.name}</p>
        <p className="small-regular text-light-3 text-center">
          @{userData.username}
        </p>
      </div>
    </div>
  );
};

export default ChatContact;
