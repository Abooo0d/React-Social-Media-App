import { useUserContext } from "@/Context/AuthContext";
import MessageCard from "@/components/Shared/MessageCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useChatsContext } from "@/Context/ChatsContext";
import {
  useCreateMessage,
  useGetUserProfile,
  useGetMessages,
} from "@/lib/React-Query/queriesAndMutation";
import Loader from "@/components/Shared/Loader";
import { FiSend } from "react-icons/fi";
import { GoPaperclip } from "react-icons/go";
import { TiMicrophoneOutline } from "react-icons/ti";
import { LuPhone } from "react-icons/lu";
import { LuVideo } from "react-icons/lu";
import { IMessage } from "@/Types";
import { useParams } from "react-router-dom";
import { AppWriteConfig, client } from "@/lib/AppWrite/config";

const ChatForm = () => {
  const {
    receiverId,
    messages,
    isGettingMessages,
    setReceiverId,
    setSenderId,
  } = useChatsContext();
  const { id } = useParams();
  const { data: receiver, isPending: isLoadingReceiver } =
    useGetUserProfile(receiverId);
  const { user } = useUserContext();
  const { mutateAsync: createMessage } = useCreateMessage();
  const [message, setMessage] = useState("");
  const [newMessages, setNewMessages] = useState<IMessage[] | undefined>();
  const [gettingChat, setGettingChat] = useState(true);
  const {} = useGetMessages(user.id, receiverId);
  const sendMessage = () => {
    const fullMessage: IMessage = {
      messageBody: message,
      senderId: user.id,
      receiverId: receiverId,
    };
    createMessage(fullMessage);
    setMessage("");
  };
  useEffect(() => {
    setSenderId(user.id);
    setReceiverId(id);
  }, [id, user.id]);
  useEffect(() => {
    setNewMessages(messages);
    setGettingChat(false);
  }, [messages, isGettingMessages]);
  useEffect(() => {
    const unsubscribe = client.subscribe(
      [
        `databases.${AppWriteConfig.databaseId}.collections.${AppWriteConfig.messageCollectionId}.documents`,
      ],
      (response: any) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          const newMessage = {
            senderId: response.payload?.senderId,
            receiverId: response.payload?.receiverId,
            messageBody: response.payload?.messageBody,
          };
          setNewMessages((prevMessages) => {
            const mes: IMessage[] | undefined = prevMessages?.map((message) => {
              return {
                senderId: message.senderId,
                receiverId: message.receiverId,
                messageBody: message.messageBody,
              };
            });
            return [newMessage, ...(mes ?? [])];
          });
        }
      }
    );
    console.log("Abood");
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <section className="h-main-section md:h-full xl:flex-1 xl:p-10 p-5 flex content-center items-center ">
      <main className="bg-dark-3 w-full h-full flex flex-col justify-between rounded-3xl xl:p-10 p-5">
        {isGettingMessages ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <header className="w-full flex justify-between items-center py-0 xl:px-8 px-4">
              <div className="info flex xl:gap-5 gap-2">
                {isLoadingReceiver ? (
                  <Loader />
                ) : (
                  <>
                    <img
                      src={
                        receiver?.documents[0]?.imageUrl ||
                        "assets/images/profile.png "
                      }
                      alt=""
                      className="rounded-full xl:w-[100px] xl:h-[100px] h-[40px] w-[40px]"
                    />
                    <div className="flex flex-col xl:gap-2 gap-0 justify-start items-start">
                      <h2 className="md:h3-bold lg:h2-bold text-sm">
                        {receiver?.documents[0].name}
                      </h2>
                      <p className="text-light-3 text-sm">
                        @{receiver?.documents[0].username}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex xl:gap-8 gap-2 justify-start items-center">
                <LuPhone className="xl:w-[45px] xl:h-[45px] w-[20px] h-[20px] text-light-4 cursor-pointer xl:p-2 p-0 duration-200 rounded-lg hover:bg-dark-4" />
                <LuVideo className="xl:w-[45px] xl:h-[45px] w-[20px] h-[20px] text-light-4 cursor-pointer xl:p-2 p-0 duration-200  rounded-lg hover:bg-dark-4" />
              </div>
            </header>
            <hr className="border-gray-800 w-[80%] mx-auto my-4" />
            <div className="h-full w-full flex flex-col-reverse gap-4 items-end justify-start overflow-auto p-5">
              {gettingChat ? (
                <Loader />
              ) : (
                <>
                  {newMessages?.map((message, index) => (
                    <MessageCard
                      message={message}
                      userId={user.id}
                      key={index}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        )}
        <hr className="border-gray-800 w-[80%] mx-auto my-4" />
        <footer className="w-full h-[100px] flex gap-3 justify-between items-center">
          <div className="w-full bg-dark-2 flex justify-start items-center rounded-lg py-2 xl:px-5 px-2 xl:h-[70px] h-[50px]">
            <GoPaperclip className="xl:w-[30px] xl:h-[30px] w-[25px] h-[25px] text-light-4" />
            <input
              className="w-full bg-dark-2 border-0 xl:text-lg text-sm py-3 xl:px-6 px-3 text-light-3 xl:h-[60px] h-[40px] outline-none rounded-md"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <TiMicrophoneOutline className="xl:w-[30px] xl:h-[30px] w-[25px] h-[25px] text-light-4" />
          </div>
          <Button
            className="rounded-lg bg-yellow-600 xl:w-[70px] xl:h-[70px] h-[50px] w-[50px] "
            onClick={() => sendMessage()}
          >
            <FiSend className="w-[27px] h-[27px] text-dark-1" />
          </Button>
        </footer>
      </main>
    </section>
    // <div>Abood</div>
  );
};

export default ChatForm;
