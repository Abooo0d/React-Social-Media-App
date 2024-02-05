import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createPost,
  createUserAccount,
  SignOutAccount,
  SingInAccount,
} from "../AppWrite/api";
import { INewPost, INewUser } from "@/Types";
import { QUERY_KEYS } from "./queryKeys";
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
    mutationFn:(post:INewPost) => createPost(post),
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
      })
    }
  })
}
