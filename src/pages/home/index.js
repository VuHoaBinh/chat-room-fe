import { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { loginForm } from "./api";

const Home = ({
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  room,
  setRoom,
  socket,
}) => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("login");

  const joinRoom = () => {
    if (room === "-- Select Room --") {
      alert("Please select a room.");
      return;
    }

    socket.emit("join_room", { username, room });
    navigate("/chat", { replace: true });
  };

  const toggleRoomSelect = async () => {
    const savedAccounts =
      JSON.parse(localStorage.getItem("userAccounts")) || [];
    const account = savedAccounts.find((acc) => acc.email === email);

    if (!account) {
      alert("Please enter a valid email address.");
      return;
    }
    if (account.password !== password) {
      alert("Password wrong.");
      return;
    }
    if (username.trim() === "") {
      alert("Please enter a username.");
      return;
    }

    try {
      const res = await loginForm({ email, password });
      console.log("loi nè: ", res.data);
      setCurrentView("room_select");
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  const handleBackButton = () => {
    setCurrentView("login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {/* Login Form ========================== */}
        {currentView === "login" && (
          <>
            <h1>Log in</h1>
            <input
              className={styles.input}
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="btn btn-secondary"
              style={{ width: "100%" }}
              onClick={toggleRoomSelect}
            >
              Log in
            </button>
            <button
              className="btn btn-secondary"
              style={{ width: "100%" }}
              onClick={() => {
                navigate("/register", { replace: true });
                setCurrentView("register");
              }}
            >
              Register
            </button>
          </>
        )}

        {/* Select Room ========================== */}
        {currentView === "room_select" && (
          <>
            <h1>Choose Room</h1>
            <h3>Hello!! {username}</h3>
            <select
              className={styles.input}
              onChange={(e) => setRoom(e.target.value)}
            >
              <option>-- Select Room --</option>
              <option value="Room1">Room 1</option>
              <option value="Room2">Room 2</option>
              <option value="Room3">Room 3</option>
              <option value="Room4">Room 4</option>
            </select>
            <button
              className="btn btn-secondary"
              style={{ width: "100%" }}
              onClick={joinRoom}
            >
              Join Room
            </button>
            <button
              className=""
              style={{
                width: "100%",
                border: "none",
                background: "none",
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleBackButton}
            >
              <i className="fa-solid fa-arrow-left"></i> Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
