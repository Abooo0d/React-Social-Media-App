import { useUserContext } from "@/Context/AuthContext";
import MessageCard from "@/components/Shared/MessageCard";
import ChatsBar from "@/components/Shared/ChatsBar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useChatsContext } from "@/Context/ChatsContext";
import {
  useCreateMessage,
  useGetUserProfile,
} from "@/lib/React-Query/queriesAndMutation";
import Loader from "@/components/Shared/Loader";
import { FiSend } from "react-icons/fi";
import { GoPaperclip } from "react-icons/go";
import { TiMicrophoneOutline } from "react-icons/ti";
import { LuPhone } from "react-icons/lu";
import { LuVideo } from "react-icons/lu";
import { Models } from "appwrite";
import { IMessage } from "@/Types";
const ChatPage = () => {
  const { receiverId, setSenderId, messages, isGettingMessages } =
    useChatsContext();
  const { data: receiver, isPending: isLoadingReceiver } =
    useGetUserProfile(receiverId);
  const { user } = useUserContext();

  const { mutateAsync: createMessage, isPending: isCreatingMessage } =
    useCreateMessage();
  const [message, setMessage] = useState("");
  const [newMessages, setNewMessages] = useState<IMessage[] | undefined>();
  const [gettingChat, setGettingChat] = useState(true);
  const sendMessage = () => {
    const fullMessage = {
      messageBody: message,
      senderId: user.id,
      receiverId: receiverId,
    };
    createMessage(fullMessage);
    let currentMessage: IMessage[] = messages.map(
      (message: Models.Document) => {
        return {
          senderId: message.senderId,
          receiverId: message.receiverId,
          messageBody: message.messageBody,
        };
      }
    );
    setNewMessages([...currentMessage, fullMessage]);
    console.log(newMessages);
    setMessage("");
  };
  useEffect(() => {
    setSenderId(user.id);
  }, []);
  useEffect(() => {
    setNewMessages(messages);
    setGettingChat(false);
  }, [message, isGettingMessages]);

  return (
    <div className="flex justify-between w-full ">
      <ChatsBar />
      {receiverId !== "" && (
        <section className="w-full p-10 flex content-center items-center ">
          <main className="bg-dark-3 w-full h-full flex flex-col justify-between rounded-3xl p-10">
            {isGettingMessages ? (
              <div className="w-full h-full flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <>
                <header className="w-full flex justify-between items-center py-0 px-8">
                  <div className="info flex gap-5">
                    {isLoadingReceiver ? (
                      <Loader />
                    ) : (
                      <>
                        <img
                          src={
                            receiver?.documents[0]?.imageUrl ||
                            "assets/images/profile.png"
                          }
                          alt=""
                          width={100}
                          height={100}
                          className="rounded-full"
                        />
                        <div className="flex flex-col gap-2 justify-start items-center">
                          <h2 className="md:h3-bold lg:h2-bold">
                            {receiver?.documents[0].name}
                          </h2>
                          <p className="text-light-3">
                            @{receiver?.documents[0].username}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="actions flex gap-8 justify-start items-center">
                    <LuPhone className="w-[45px] h-[45px] text-light-4 cursor-pointer p-2 duration-200 rounded-lg hover:bg-dark-4" />
                    <LuVideo className="w-[45px] h-[45px] text-light-4 cursor-pointer p-2 duration-200  rounded-lg hover:bg-dark-4" />
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
              <div className="w-full bg-dark-2 flex justify-start items-center rounded-lg py-2 px-5 h-[70px]">
                {/* <img
                  src="/assets/icons/chat.svg"
                  alt=""
                  width={50}
                  height={50}
                /> */}
                <GoPaperclip className="w-[30px] h-[30px]  text-light-4" />
                <input
                  className="w-full bg-dark-2 border-0 text-lg py-3 px-6 text-light-3 h-[60px] outline-none rounded-md"
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <TiMicrophoneOutline className="w-[30px] h-[30px] text-light-4" />
              </div>
              <Button
                className="rounded-lg bg-yellow-600 w-[70px] h-[70px]"
                onClick={() => sendMessage()}
              >
                <FiSend className="w-[27px] h-[27px] text-dark-1" />
              </Button>
            </footer>
          </main>
        </section>
      )}
    </div>
  );
};

export default ChatPage;
