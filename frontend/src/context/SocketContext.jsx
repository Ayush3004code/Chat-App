import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketContextProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // init socket client
    if (authUser) {
      const socket = io("https://chat-app-mern-n4aw.onrender.com/", {
        query: {
          userId: authUser.id,
        },
      });
      setSocket(socket);

      //errorhandling
      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });
      //get online users
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      //   return socket
      return () => {
        socket.close();
      };
      //   close socket
    } else if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [authUser]);

  return (
    // return context provider
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
