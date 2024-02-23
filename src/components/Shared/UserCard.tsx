import { Models } from "appwrite";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type userCardProps = {
  user: Models.Document;
};
const UserCard = ({ user }: userCardProps) => {
  return (
    <Link
      className="flex w-[230px] flex-col gap-5 py-6 flex-center border border-gray-900 rounded-lg cursor-pointer"
      to={`/profile/${user.$id}`}
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
      <Button className="shad-button_primary whitespace-nowrap">Follow</Button>
    </Link>
  );
};

export default UserCard;
