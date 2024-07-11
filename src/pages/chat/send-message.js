import styles from "./styles.module.css";
import React, { useState } from "react";

const SendMessage = ({ socket, email, password, username, room }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      socket.emit("send_message", {
        username,
        message,
        room,
        __createdtime__,
      });
      setMessage("");
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder="Message..."
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
