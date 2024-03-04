import ChatsBar from "@/components/Shared/ChatsBar";
import { Outlet } from "react-router-dom";
const ChatPage = () => {
  return (
    <div className="flex justify-start xl:justify-between w-full flex-wrap flex-col xl:flex-row">
      <ChatsBar />
      <Outlet />
    </div>
  );
};

export default ChatPage;
