import { useUserContext } from "@/Context/AuthContext";
import GridPostsList from "@/components/Shared/GridPostsList";
import PostListCard from "@/components/Shared/PostListCard";
import { useGetSavedPosts } from "@/lib/React-Query/queriesAndMutation";
import { useEffect } from "react";

const Saved = () => {
  const {
    data: savedPosts,
    isPending: isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetSavedPosts();
  const { user } = useUserContext();
  useEffect(() => {
    console.log(savedPosts);
    savedPosts?.pages.map((page) =>
      console.log(page?.documents[0].post.caption)
    );
  }, [isLoading]);

  return (
    <div className="explore-container">
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h2 className="h3-bold lg:h2-bold">Saved Posts</h2>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {savedPosts?.pages.map((page) => (
          <ul className="grid-container">
            {page?.documents.map((post, index) => (
              <PostListCard
                key={index}
                post={post.post}
                user={user}
                showStatus={false}
                showUser={false}
              />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Saved;
