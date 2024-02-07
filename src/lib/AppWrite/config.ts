import {Client,Account ,Databases,Storage, Avatars} from 'appwrite';
// Exporting The Main Keys  From The .env.local To Connect To Tha Database And Get Info
export const AppWriteConfig = {
  projectId:import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url:import.meta.env.VITE_APPWRITE_URL,
  databaseId:import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId:import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId:import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  postCollectionId:import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
  savesCollectionId:import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
};
// exporting the Main Element To Connect To DataBase
export const client = new Client();
client.setProject(AppWriteConfig.projectId);
client.setEndpoint(AppWriteConfig.url)
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
