import { Models } from "appwrite";
import { Link } from "react-router-dom";
type userCardProps = {
  userData: Models.Document;
  receiverId: string | undefined;
};
const ChatContact = ({ userData }: userCardProps) => {
  return (
    <Link
      to={`/chats/${userData.$id}`}
      className="flex flex-row justify-start items-center h-full w-full 
                gap-5 cursor-pointer border-small border-dark-4 p-2 rounded-lg
              hover:border-primary-500 duration-200 border-none"
    >
      <img
        src={userData?.imageUrl}
        alt="User Image"
        className="rounded-full w-[60px] h-[60px]"
      />
      <div className="flex flex-col">
        <p className="block body-bold text-center mb-2">{userData.name}</p>
        <p className="small-regular text-light-3 text-center max-w-[90px] overflow-hidden">
          @{userData.username}
        </p>
      </div>
    </Link>
  );
};

export default ChatContact;
