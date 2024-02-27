import { useUserContext } from "@/Context/AuthContext";
import MessageCard from "@/components/Shared/MessageCard";
import ChatsBar from "@/components/Shared/ChatsBar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useChatsContext } from "@/Context/ChatsContext";
import { useGetUserProfile } from "@/lib/React-Query/queriesAndMutation";

const ChatPage = () => {
  const { receiverId, setSenderId, messages, isGettingMessages } =
    useChatsContext();
  const { data: receiver, isPending: isLoadingReceiver } =
    useGetUserProfile(receiverId);
  const { user } = useUserContext();
  useEffect(() => {
    setSenderId(user.id);
  }, []);
  useEffect(() => {
    console.log("Abood");
  }, [isGettingMessages]);

  return (
    <div className="flex justify-between w-full ">
      <ChatsBar />
      {receiverId !== "" && (
        <section className="w-full p-10 flex content-center items-center ">
          <main className="bg-dark-3 w-full h-full flex flex-col justify-between rounded-3xl p-10">
            <header className="w-full flex justify-between items-center py-2 px-4">
              <div className="info flex gap-5">
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
              </div>
              <div className="actions flex gap-4 justify-start items-center">
                <span className="py-2 px-4 rounded-md border-2 border-primary-500 text-primary-500 cursor-pointer">
                  Voice
                </span>
                <span className="py-2 px-4 rounded-md border-2 border-primary-500 text-primary-500 cursor-pointer">
                  Video
                </span>
              </div>
            </header>
            <hr className="border-gray-800 w-[80%] mx-auto my-4" />
            <div className="h-full w-full flex flex-col-reverse gap-4 items-end justify-start overflow-auto p-5">
              {messages?.map((message, index) => (
                <MessageCard message={message} userId={user.id} key={index} />
              ))}
            </div>
            <hr className="border-gray-800 w-[80%] mx-auto my-4" />
            <footer className="w-full h-[100px] flex gap-3 justify-between items-center">
              <div className="w-full bg-dark-2 flex justify-start items-center rounded-lg py-2 px-5 h-[70px]">
                <img
                  src="/assets/icons/chat.svg"
                  alt=""
                  width={50}
                  height={50}
                />
                <input
                  className="w-full bg-dark-2 border-0 text-lg py-3 px-6 text-light-3 h-[60px] outline-none rounded-md"
                  placeholder="Your Message"
                />
                <img
                  src="/assets/icons/chat.svg"
                  alt=""
                  width={50}
                  height={50}
                />
              </div>
              <Button className="rounded-lg bg-yellow-600 w-[70px] h-[70px]">
                Send
              </Button>
            </footer>
          </main>
        </section>
      )}
    </div>
  );
};

export default ChatPage;
