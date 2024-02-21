import { Link } from "react-router-dom";
import PostStatus from "./PostStatus";
import { Models } from "appwrite";
import { IUser } from "@/Types";
type postListCardProps = {
  post: Models.Document;
  showUser: boolean;
  showStatus: boolean;
  user: IUser;
};
const PostListCard = ({
  post,
  showUser,
  showStatus,
  user,
}: postListCardProps) => {
  return (
    <li className="relative lg-w-80 lg-h-80 md:w-75 md:h-75">
      <Link to={`/posts/${post?.$id}`} className="grid-post_link">
        <img
          src={post?.imageUrl}
          alt="post"
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="grid-post_user">
        {showUser && (
          <div className="flex items-center justify-start gap-2 flex-1">
            <img
              src={post?.creator?.imageUrl}
              alt="Creator"
              className="h-8 w-8 rounded-full"
            />
            <p className="line-clamp-1">{post?.creator?.name}</p>
          </div>
        )}
        {showStatus && <PostStatus post={post} userId={user.id} />}
      </div>
    </li>
  );
};

export default PostListCard;
