import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostsList from "./GridPostsList";
type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPost: Models.DocumentList<Models.Document> | undefined;
};
const SearchResults = ({
  isSearchFetching,
  searchedPost,
}: SearchResultProps) => {
  if (isSearchFetching) return <Loader />;
  if (searchedPost && searchedPost.documents.length > 0) {
    return <GridPostsList posts={searchedPost.documents} />;
  }
  return <p className="text-light-4 text-center w-full">No Results Found</p>;
};

export default SearchResults;
