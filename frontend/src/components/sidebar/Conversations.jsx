import useGetConversations from "../../hooks/useGetConversations";
import Convo from "./Convo";

function Conversations() {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Convo
          key={conversation._id}
          conversation={conversation}
          lastindex={idx === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="spinner loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
}

export default Conversations;
