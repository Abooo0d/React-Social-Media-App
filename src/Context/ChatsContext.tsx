import { IChatType } from "@/Types";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { useUserContext } from "./AuthContext";
import { useGetMessages } from "@/lib/React-Query/queriesAndMutation";
import { Models } from "appwrite";
import { getMessages } from "@/lib/AppWrite/api";
const INITIAL_STATE = {
  senderId: "",
  receiverId: "",
  setReceiverId: () => {},
  setSenderId: () => {},
  messages: [],
  isGettingMessages: false,
};
const ChatsContext = createContext<IChatType>(INITIAL_STATE);
const ChatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [messages, setMessages] = useState<Models.Document[]>();
  const [isGettingMessages, setIsGettingMessages] = useState(false);
  const FetchMessages = async () => {
    setIsGettingMessages(true);
    const data = await getMessages(senderId, receiverId);
    setMessages(data?.documents);
    console.log(messages);
    setIsGettingMessages(false);
  };
  useEffect(() => {
    if (senderId !== "" && receiverId !== "") {
      FetchMessages();
    }
  }, [receiverId, senderId]);
  const values = {
    senderId,
    receiverId,
    messages,
    isGettingMessages,
    setReceiverId,
    setSenderId,
  };
  return (
    <ChatsContext.Provider value={values}>{children}</ChatsContext.Provider>
  );
};
export default ChatsProvider;
export const useChatsContext = () => useContext(ChatsContext);
