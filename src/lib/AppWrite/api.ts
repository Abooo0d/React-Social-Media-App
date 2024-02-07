import { INewPost, INewUser } from "@/Types";
import { ID, Query } from "appwrite";
import { AppWriteConfig, account, avatars, databases, storage } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) return Error;
    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await SaveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function SaveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      AppWriteConfig.databaseId,
      AppWriteConfig.userCollectionId,
      ID.unique(),
      user
    );
  } catch (error) {
    console.log(error);
  }
}
export async function SingInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    return error;
  }
}
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      AppWriteConfig.databaseId,
      AppWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}
export async function SignOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}
export async function createPost(post:INewPost){
  try {
    const uploadedFile = await uploadFile(post.file[0]);
    if(!uploadedFile) throw Error;
    // const fileUrl = getFilePreView(uploadedFile.$id);
    const fileUrl = storage.getFilePreview(AppWriteConfig.storageId,uploadedFile.$id,2000,2000,'top',100);
    console.log(fileUrl.href);
    if (!fileUrl) {
      deleteFile(uploadedFile.$id);
      throw Error;
    }
    const tags = post.tags?.replace(/ /g,'').split('#') || [];
    const newPost = await databases.createDocument(AppWriteConfig.databaseId,AppWriteConfig.postCollectionId,ID.unique(),{
      creator:post.userId,
      caption:post.caption,
      imageUrl:fileUrl.href,
      imageId:uploadedFile.$id,
      location:post.location,
      tags:tags
    });
    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
    return newPost;
  } catch (error) {
    console.log(error);
  }
}
export async function uploadFile(file:File){
  try {
    const uploadedFile = await storage.createFile(
      AppWriteConfig.storageId,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}
export async function getFilePreView(fileId:string) {
try {
  const fileUrl = storage.getFilePreview(AppWriteConfig.storageId,fileId,2000,2000,'top',100);
  if(!fileUrl) throw Error;
  return fileUrl;
} catch (error) {
  console.log(error);
}
}
export async function deleteFile(fileId:string){
  try {
    await storage.deleteFile(AppWriteConfig.storageId,fileId);
    return {status:'ok'};
  } catch (error) {
    console.log(error);
  }
}