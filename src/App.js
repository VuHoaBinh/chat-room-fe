import "./App.css";
import { useState } from "react";
import Home from "./pages/home";
import Chat from "./pages/chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Register from "./pages/home/register";
import Intro from "./pages/home/intro";

const socket = io.connect("http://localhost:4000");

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              <Home
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          {}
          <Route
            path="/chat"
            element={<Chat username={username} room={room} socket={socket} />}
          />
          <Route path="/" element={<Intro />} />
          <Route
            path="/register"
            element={
              <Register
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
