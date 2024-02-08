import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/React-Query/queriesAndMutation";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
type PostStatusProps = {
  post: Models.Document;
  userId: string;
};
const PostStatus = ({ post, userId }: PostStatusProps) => {
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );
  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);
  const handelLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };
  const handelSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ postId: post.$id, userId });
      setIsSaved(true);
    }
  };
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likesList, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="Like Image"
          width={20}
          height={20}
          onClick={handelLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2 ">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="Like Image"
          width={20}
          height={20}
          onClick={handelSavePost}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStatus;
