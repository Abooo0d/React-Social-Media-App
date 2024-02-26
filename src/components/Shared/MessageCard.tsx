import { IMessage } from "@/Types";

type MessageCardProps = {
  message: IMessage;
  userId: string;
};
const MessageCard = ({ message, userId }: MessageCardProps) => {
  return (
    <div className="w-full flex flex-col ">
      <div
        className={`py-4 px-6 rounded-lg w-fit max-w-400 relative ${
          message.id === userId
            ? `ml-auto bg-primary-500 text-light-1 rounded-br-none`
            : `mr-auto bg-dark-4 rounded-bl-none`
        }`}
      >
        {/* <span className="w-[8px] h-[8px] border-r-8 border-r-primary-500" /> */}
        <span
          className={`absolute bottom-0 border-[10px] w-[20px] h-[20px] bg-transparent border-transparent ${
            message.id === userId
              ? ` border-b-primary-500 -right-[10px] border-b-[10px]`
              : `border-r-dark-4 -left-[10px] border-r-[10px] rotate-[90deg]`
          } `}
        />
        {message.messageBody}
      </div>
    </div>
  );
};

export default MessageCard;
