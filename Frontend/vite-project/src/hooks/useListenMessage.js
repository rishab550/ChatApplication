import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";
import notificationSound from "../../src/assets/sounds/notification.mp3";

const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessages", (newMessages) => {
      newMessages.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessages]);
    });

    return () => socket?.off("newMessages");
  }, [socket, setMessages, messages]);
};

export default useListenMessage;
