import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../store/useConversation";
import notificationSound from "../assets/notification.mp3"
const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();
    useEffect(() => {
        // new message is like an event or hook getting from backend
        socket?.on("newMessage", (newMessage) => {
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage])
        })
        return () => socket?.off("newMessage")
    }, [socket, messages, setMessages,])
}

export default useListenMessages