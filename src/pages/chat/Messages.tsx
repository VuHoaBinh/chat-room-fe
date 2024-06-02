import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

interface Message {
  message: string;
  username: string;
  __createdtime__: string;
}

interface MessagesProps {
  socket: any;
}

export const  Messages: React.FC<MessagesProps> = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState<Message[]>([]);

  const messagesColumnRef = useRef<HTMLDivElement>(null);

  // Runs whenever a socket event is received from the server
  useEffect(() => {
    socket.on('receive_message', (data: any) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on('last_100_messages', (last100Messages: any) => {
      console.log('Last 100 messages:', JSON.parse(last100Messages));
      last100Messages = JSON.parse(last100Messages);
      // Sort these messages by __createdtime__
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });

    return () => socket.off('last_100_messages');
  }, [socket]);

  // Scroll to the most recent message
  useEffect(() => {
    if (messagesColumnRef.current) {
      messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
    }
  }, [messagesRecieved]);

  function sortMessagesByDate(messages: Message[]): Message[] {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp: string): string {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};
export default Messages;