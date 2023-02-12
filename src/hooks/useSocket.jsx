import { useEffect } from "react";
import { io } from "socket.io-client";
import { useStore } from "../context/store";

export default function useSocket() {
  const { user, set } = useStore('user');
  const { socket } = useStore('socket');

  useEffect(() => {
    if (!user.info) return;
    const token = localStorage.getItem('token');
    const connection = io(import.meta.env.VITE_SOCKET_URL, {
      auth: {
        token,
      }
    });
    set({
      socket: connection,
    });
    return () => {
      connection.close();
    }
  }, [user.info]);

  useEffect(() => {
    if (!socket || !user.info) return;

    socket.emit('user', user.info.email);
    socket.on('challenge-recieved', (challengeInfo) => {
      set({
        challenge: challengeInfo,
        alertMessage: {
          type: 'challenge',
          message: `${challengeInfo.by.email} is challenging you to a ${challengeInfo.time} min chess game, where you play with ${challengeInfo.to.playAs}`
        },
      });

    });
    socket.on('challenge-accepted', (challenge) => {
      const challengerColor = challenge.by.playAs;
      const challengedColor = challenge.to.playAs;

      const challengerEmail = challenge.by.email;
      const challengedEmail = challenge.to.email;

      const gameInfo = {
        player: {
          color: challengerEmail === user.info.email ? challengerColor : challengedColor,
          opponent: challengerEmail === user.info.email ? challengedEmail : challengerEmail,
        }
      };
      set({
        gameInfo,
        challenge: {
          by: {
            email: null,
            playAs: null,
          },
          to: {
            email: null,
            playAs: null,
          },
          accepted: false,
        }
      });
      localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
      localStorage.removeItem('challenge');
    });
    socket.on('connect_error', (err) => {
      set({
        alertMessage: {
          type: 'error',
          message: err.message,
        }
      });
    });
  }, [socket, user.info]);

  return socket;
}