import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useStore } from "../context/store";

export default function useSocket() {
  const [socket, setSocket] = useState(null);
  const { correctToken, set } = useStore('correctToken');
  const { user } = useStore('user');
  // const { challenge } = useStore('challenge');

  useEffect(() => {
    const { callback } = correctToken;
    if (!callback) return;
    const token = callback(localStorage.getItem('token'));
    const connection = io("http://localhost:8081", {
      auth: {
        token,
      }
    });
    setSocket(connection);
    return () => {
      connection.close();
    }
  }, [correctToken]);

  useEffect(() => {
    if (!socket || !user.info) return;
    
    socket.on('connect', () => console.log(socket));
    socket.emit('user', user.info.email);
    socket.on('connect_error', (err) => {
      set({
        alertMessage: {
          type: 'error',
          message: err.message,
        }
      });
    });
    socket.on("disconnect", () => console.log("disconnected"));
  }, [socket, user.info]);

  return socket;
}