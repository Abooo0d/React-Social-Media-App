import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createMessage,
  createPost,
  createUserAccount,
  deletePost,
  deleteSavedPost,
  getChats,
  getCurrentUser,
  getInfinitePosts,
  getInfiniteUsers,
  getMessages,
  getPostById,
  getRecentPosts,
  getSavedPosts,
  getUserById,
  GetUserPosts,
  likePost,
  savePost,
  searchPosts,
  searchUsers,
  SignOutAccount,
  SingInAccount,
  updatePost,
} from "../AppWrite/api";
import { IMessage, INewPost, INewUser, IUpdatePost } from "@/Types";
import { QUERY_KEYS } from "./queryKeys";
// using React Query To manage The Data Fetching And Auto Cashing The Data

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      SingInAccount(user),
  });
};
export const useSignOutAccount = () => {
  return useMutation({ mutationFn: SignOutAccount });
};
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};
export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => likePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savePost(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savePostId: string) => deleteSavedPost(savePostId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};
export const useGetPostById = (postId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries();
    },
  });
};
export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => {
      if (lastPage && lastPage.documents.length === 0) return null;
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
  });
};
export const useSearchPosts = (searchTerms: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerms],
    queryFn: () => searchPosts(searchTerms),
    enabled: !!searchTerms,
  });
};
export const useGetUsers = () => {
  return useInfiniteQuery({
    queryKey: ["getInfiniteUsers"],
    queryFn: getInfiniteUsers,
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => {
      if (lastPage && lastPage.documents.length === 0) return 0;
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
  });
};
export const useGetSavedPosts = (userId: string) => {
  return useQuery({
    queryKey: ["getSavedPost", userId],
    queryFn: () => getSavedPosts(userId),
    enabled: !!userId,
  });
};
export const useGetUserProfile = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};
export const useGetUserPosts = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS, id],
    queryFn: () => GetUserPosts(id),
    enabled: !!id,
  });
};
export const useSearchUser = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_USERS, searchTerm],
    queryFn: () => searchUsers(searchTerm),
    enabled: !!searchTerm,
  });
};
export const useGetChats = (userId: string) => {
  return useQuery({
    queryKey: ["getChats"],
    queryFn: () => getChats(userId),
    enabled: !!userId,
  });
};
export const useGetMessages = (senderId: string, receiverId: string) => {
  return useQuery({
    queryKey: ["getMessage", senderId, receiverId],
    queryFn: () => getMessages(senderId, receiverId),
    enabled: !!senderId || !!receiverId,
  });
};
export const useCreateMessage = () => {
  return useMutation({
    mutationFn: (message: IMessage) => createMessage(message),
  });
};
