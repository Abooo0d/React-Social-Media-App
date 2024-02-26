import { Models } from "appwrite";
type userCardProps = {
  user: Models.Document;
};
const ChatContact = ({ user }: userCardProps) => {
  return (
    <div
      className="flex w-full gap-5 content-start items-start cursor-pointer "
      // to={`/profile/${user.$id}`}
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
    </div>
  );
};

export default ChatContact;
