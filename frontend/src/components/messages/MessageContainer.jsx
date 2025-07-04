// import Header from "./Header";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../store/useConversation.js";
import { useAuthContext } from "../../context/AuthContext";

function MessageContainer() {
  const { selectedConversation } = useConversation();
  const noChatSelected = selectedConversation ? false : true;
  return (
    <div className="md:min-w-[450px] flex flex-col border border-slate-400 ">
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <>
          {/* <Header/> */}
          <div className="bg-slate-500  px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation?.username}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl font-semibold flex flex-col items-center gap-2">
        <p>Hi {authUser?.username}</p>
        <p>Select a chat to start messaging.</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
