import styles from "./styles.module.css";
import RoomAndUsersColumn from "./room-and-users";
import SendMessage from "./send-message";
import MessagesReceived from "./messages";

const Chat = ({ email, password, username, room, socket }) => {
  return (
    <div className={styles.chatContainer}>
      <RoomAndUsersColumn socket={socket} username={username} room={room} />

      <div>
        <MessagesReceived socket={socket} />
        <SendMessage
          socket={socket}
          email={email}
          password={password}
          username={username}
          room={room}
        />
      </div>
    </div>
  );
};

export default Chat;
