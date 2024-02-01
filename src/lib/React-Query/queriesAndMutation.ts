import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery} from '@tanstack/react-query';
import { createUserAccount, SingInAccount } from '../AppWrite/api';
import { INewUser } from '@/Types';
export const useCreateAccount = () => {
  return useMutation({
    mutationFn:(user:INewUser)=> createUserAccount(user),
  })
}
export const useSignInAccount = () => {
  return useMutation({
    mutationFn:(user:{email:string, password:string},)=> SingInAccount(user),
  })
}