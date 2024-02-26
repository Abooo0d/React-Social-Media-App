import { useUserContext } from "@/Context/AuthContext";
import Loader from "@/components/Shared/Loader";
import PostListCard from "@/components/Shared/PostListCard";
import { useGetSavedPosts } from "@/lib/React-Query/queriesAndMutation";

const Saved = () => {
  const { user } = useUserContext();
  const { data: savedPosts, isPending: isLoading } = useGetSavedPosts(user.id);
  return (
    <div className="explore-container">
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h2 className="h3-bold lg:h2-bold">Saved Posts</h2>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          <ul className="grid-container">
            {savedPosts &&
              savedPosts.documents.map((post, index) => (
                <PostListCard
                  key={index}
                  post={post.post}
                  user={user}
                  showStatus={false}
                  showUser={false}
                />
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Saved;
