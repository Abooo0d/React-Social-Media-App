import Loader from "@/components/Shared/Loader";
import PostCard from "@/components/Shared/PostCard";
import { useGetRecentPosts } from "@/lib/React-Query/queriesAndMutation";
import { Models } from "appwrite";

const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document, index: number) => (
                <PostCard post={post} key={index} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
