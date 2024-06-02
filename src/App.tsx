import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Home from './pages/Home/index';
import Chat from './pages/chat/index';

const socket = io('http://localhost:4000')

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          <Route
            path='/chat'
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
