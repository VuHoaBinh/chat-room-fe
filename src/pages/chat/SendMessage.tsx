import { Socket } from "socket.io-client";
import styles from "./styles.module.css";
import React, { useState } from "react";

interface SendMessageProps {
  socket: Socket;
  username: string;
  room: string;
}

const SendMessage: React.FC<SendMessageProps> = ({
  socket,
  username,
  room,
}) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      socket.emit("send_message", { username, room, message, __createdtime__ });
      setMessage("");
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder="Gửi tin nhắn ..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className="btn btn-primary" onClick={sendMessage}>
        <i className="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  );
};

export default SendMessage;
