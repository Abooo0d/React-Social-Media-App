import { INewPost, INewUser, IUpdatePost } from "@/Types";
import { AppwriteException, ID, Query } from "appwrite";
import { AppWriteConfig, account, avatars, databases, storage } from "./config";
/**
 * This Function It used To Create New User In With Out Saving It To The Database
 * To Create The Account Object Then Saving The Data To Database Using SaveUserToDB()
 * @var user :INewUser - The User Information That Will Be Used To Create A new User.
 * @return newUser
 * @author Abooo0d : abdsadalden2001@gmail.com
 */
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
/**
 * This Function Is Used To Save The Latest Created User To The Database
 * @param user The User Info That You Want To Add To The Database .
 * @author Abooo0d : abdsadalden2001@gmail.com
 */
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
/**
 * This Function Used To Create New Session The Email Provided
 * @param user: That Has An Email And PAssword
 * @returns session  : Contains Token , User & Expire In
 */
export async function SingInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    return error;
  }
}
/**
 * This Function IS Used To Get The Current Logged In user Info
 * @returns currentAccount : The Info Of The Logged In User
 */
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
/**
 * This Function Is Used To Delete The Current Session
 * @returns The Deleted Account
 */
export async function SignOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}
/**
 * This Function Is used To Create new Post And Saved To Database And Upload The Image To Data Storage In Ap Write Cloud
 * @param post : Post Object That You Want To Create
 * @returns The Created Post
 */
export async function createPost(post: INewPost) {
  try {
    // Upload The Image From The Post
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw Error;
    const fileUrl = getFilePreView(uploadedFile.$id);
    if (!fileUrl) {
      deleteFile(uploadedFile.$id);
      throw Error;
    }
    // Get The Tags In The Post
    const tags = post.tags?.replace(/ /g, "").split("#") || [];
    // Creating The New Post In The Database By Passing The Data
    // [databaseId,PostCollectionId,The new Post Id,The Data Object]
    const newPost = await databases.createDocument(
      AppWriteConfig.databaseId,
      AppWriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl.href,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );
    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
    return newPost;
  } catch (error) {
    console.log(error);
  }
}
/**
 * This Function Is used To Upload The Post Image To The Data Storage
 * @param file The Image Wanted To Upload
 * @returns The Uploaded Image
 */
export async function uploadFile(file: File) {
  try {
    // Creating The File In Data Storage
    //[storageId,file ID,The File]
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
export function getFilePreView(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      AppWriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}
/**
 *
 * @param fileId The File Wanted To Delete
 * @returns The ok Status After Deleting The File
 */
export async function deleteFile(fileId: string) {
  try {
    // Deleting the File From The Data Storage
    // [storageId,The File Id]
    await storage.deleteFile(AppWriteConfig.storageId, fileId);
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}
/**
 * @returns The Recent Posts According To Created At Date
 */
export async function getRecentPosts() {
  const posts = await databases.listDocuments(
    AppWriteConfig.databaseId,
    AppWriteConfig.postCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(20)]
  );
  if (!posts) throw Error;
  else return posts;
}
export async function likePost(postId: string, likesArray: string[]) {
  try {
    const updatePost = await databases.updateDocument(
      AppWriteConfig.databaseId,
      AppWriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );
    if (!updatePost) throw Error;
    return updatePost;
  } catch (error) {
    console.log(error);
  }
}
export async function savePost(postId: string, userId: string) {
  try {
    const savedPost = await databases.createDocument(
      AppWriteConfig.databaseId,
      AppWriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );
    if (!savedPost) throw Error;
    return savedPost;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteSavedPost(savedPostId: string) {
  try {
    const statusCode = await databases.deleteDocument(
      AppWriteConfig.databaseId,
      AppWriteConfig.savesCollectionId,
      savedPostId
    );
    if (!statusCode) throw Error;
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}
export async function getPostById(postId?: string) {
  if (!postId) throw Error;
  try {
    const post = await databases.getDocument(
      AppWriteConfig.databaseId,
      AppWriteConfig.postCollectionId,
      postId
    );
    if (!post) throw Error;
    return post;
  } catch (error) {
    console.log(error);
  }
}
export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;
  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };
    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;
      // Upload The Image From The Post
      const fileUrl = getFilePreView(uploadedFile.$id);
      if (!fileUrl) {
        deleteFile(uploadedFile.$id);
        throw Error;
      }
      image = { ...image, imageId: uploadedFile.$id, imageUrl: fileUrl };
    }
    // Get The Tags In The Post
    const tags = post.tags?.replace(/ /g, "").split("#") || [];
    // Updating The New Post In The Database By Passing The Data
    // [databaseId,PostCollectionId,The new Post Id,The Data Object]
    const updatedPost = await databases.updateDocument(
      AppWriteConfig.databaseId,
      AppWriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );
    if (!updatedPost) {
      await deleteFile(post.imageId);
      throw Error;
    }
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}
export async function deletePost(postId: string, imageId: string) {
  if (!postId || !imageId) throw Error;
  try {
    await databases.deleteDocument(
      AppWriteConfig.databaseId,
      AppWriteConfig.postCollectionId,
      postId
    );
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}
