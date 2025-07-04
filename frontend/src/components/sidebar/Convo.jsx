import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../store/useConversation";

function Convo({ conversation, lastindex }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-400" : ""
        }`}
        onClick={() => {
          setSelectedConversation(conversation);
        }}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilepic} alt="user avatar" />
          </div>
        </div>
        <div className="flex  flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-400">{conversation.fullName}</p>
            <span className="text-xl ">1d</span>
          </div>
        </div>
      </div>
      {!lastindex && <div className="my-1 py-0  h-1 divider" />}
    </>
  );
}

export default Convo;

// function Convo() {
//     return (
//       <>
//         <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
//           <div className="avatar online">
//             <div className="w-12 rounded-full">
//               <img
//                 src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
//                 alt="user avatar"
//               />
//             </div>
//           </div>
//           <div className="flex  flex-col flex-1">
//             <div className="flex gap-3 justify-between">
//               <p className="font-bold text-gray-400">John Doe</p>
//               <span className="text-xl ">1d</span>
//             </div>
//           </div>
//         </div>
//         <div className="my-0 py-0  h-1"></div>
//       </>
//     );
//   }
