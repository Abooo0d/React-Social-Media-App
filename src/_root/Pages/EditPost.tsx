import PostForm from "@/components/Forms/PostForm";
import Loader from "@/components/Shared/Loader";
import { useGetPostById } from "@/lib/React-Query/queriesAndMutation";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending: IsGettingPost } = useGetPostById(id || "");
  if (IsGettingPost) return <Loader />;
  return (
    <div className="flex flex-1 ">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full ">
          <img
            src="/assets/icons/add-post.svg"
            height={36}
            width={36}
            alt="Add Post "
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Update Post </h2>
        </div>
        <PostForm action="Update" postData={post} />
      </div>
    </div>
  );
};

export default EditPost;
