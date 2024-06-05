import { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^.{6,}$/;
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userAccounts, setUserAccounts] = useState([]);

  const joinRoom = () => {
    if (room === "-- Select Room --") {
      alert("Please select a room.");
      return;
    }

    socket.emit("join_room", { username, room });

    navigate("/chat", { replace: true });
  };

  const [currentView, setCurrentView] = useState("login");

  const toggleRoomSelect = () => {
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

    setCurrentView("room_select");
  };

  const toggleRegister = () => {
    if (currentView !== "register") {
      setCurrentView("register");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 6 characters.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("Passwords do not match.");
      return;
    }

    const savedAccounts =
      JSON.parse(localStorage.getItem("userAccounts")) || [];
    const accountExists = savedAccounts.some((acc) => acc.email === email);

    if (accountExists) {
      alert("An account with this email already exists.");
      return;
    }

    const newAccounts = [...savedAccounts, { email, password }];
    localStorage.setItem("userAccounts", JSON.stringify(newAccounts));

    alert("Registration successful. Please log in.");
    setCurrentView("login");
  };

  const handleBackButton = () => {
    if (currentView === "room_select") {
      setCurrentView("login");
    } else if (currentView === "register") {
      setCurrentView("login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {/* Login Form ==========================*/}
        {currentView === "login" && (
          <>
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
                placeholder="UserName ..."
                onChange={(e) => setUsername(e.target.value)}
              />
            </>
            <button
              className="btn btn-secondary"
              style={{ width: "100%" }}
              onClick={toggleRoomSelect}
            >
              Log in
            </button>
            <button
              className="btn btn-secondary"
              style={{
                width: "100%",
              }}
              onClick={toggleRegister}
            >
              Register
            </button>
          </>
        )}

        {/* Select Room ==========================*/}
        {currentView === "room_select" && (
          <>
            <h1>Choose Room </h1>
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

        {/* Register Form ==========================*/}
        {currentView === "register" && (
          <>
            <h1>Register</h1>
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
              placeholder="Password Confirm"
              type="password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button
              className="btn btn-secondary"
              style={{ width: "100%" }}
              onClick={toggleRegister}
            >
              Register
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
