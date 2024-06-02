import React, { ChangeEvent } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";

interface HomeProps {
  username: string;
  setUsername: (username: string) => void;
  room: string;
  setRoom: (room: string) => void;
  socket: Socket;
}

const Home: React.FC<HomeProps> = ({
  username,
  setUsername,
  room,
  setRoom,
  socket,
}) => {
  const navigate = useNavigate();
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleRoomChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRoom(event.target.value);
  };

  const handleJoinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
    navigate("/chat", { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Chat Room</h1>
        <input
          className={styles.input}
          placeholder="Username..."
          value={username}
          onChange={handleUsernameChange}
        />

        <select
          className={styles.input}
          value={room}
          onChange={handleRoomChange}
        >
          <option>-- Select Room --</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </select>

        <button
          className="btn btn-secondary"
          style={{ width: "100%" }}
          onClick={handleJoinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
