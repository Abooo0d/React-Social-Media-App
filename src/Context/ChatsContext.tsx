import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { getMessages } from "@/lib/AppWrite/api";
import { IMessage } from "@/Types";
export type IChatType = {
  senderId: string;
  receiverId: string;
  messages: any;
  isGettingMessages: boolean;
  setReceiverId: React.Dispatch<React.SetStateAction<string>>;
  setSenderId: React.Dispatch<React.SetStateAction<string>>;
  // setMessages: React.Dispatch<
  //   React.SetStateAction<Models.DocumentList<Models.Document> | undefined>
  // >;
};
const INITIAL_STATE: IChatType = {
  senderId: "",
  receiverId: "",
  messages: undefined,
  isGettingMessages: false,
  setReceiverId: () => "",
  setSenderId: () => "",
};
const ChatsContext = createContext<IChatType>(INITIAL_STATE);
const ChatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [messages, setMessages] = useState<IMessage[] | undefined>();
  // const [messages, setMessages] = useState<IMessage | undefined>(); // Initialize with an empty array
  const [isGettingMessages, setIsGettingMessages] = useState(false);
  const FetchMessages = async () => {
    setIsGettingMessages(true);
    const data = await getMessages(senderId, receiverId);
    const me: IMessage[] | undefined = data?.documents.map((message) => {
      return {
        senderId: message.senderId,
        receiverId: message.receiverId,
        messageBody: message.messageBody,
      };
    });
    setMessages(me);
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
