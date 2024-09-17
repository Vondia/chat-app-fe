'use client';
import { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { io, Socket } from 'socket.io-client';
import * as styles from './chat.styles'; // Importing all styles under the `styles` namespace
import LogoutButton from '@/app/login/logout-button';

interface Message {
  id: number;
  body: string;
  author: string;
}

interface ChatProps {
  currentUser: string;
}

const SystemMessage: Message = {
  id: 1,
  body: 'Welcome to the Nest Chat app',
  author: 'Bot',
};

const socket: Socket = io('http://localhost:4000', { autoConnect: false });

export function Chat({ currentUser }: ChatProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([SystemMessage]);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('chat', (newMessage: Message) => {
      console.log('New message added', newMessage);
      setMessages((previousMessages) => [...previousMessages, newMessage]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat');
    };
  }, []);

  const handleSendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || inputValue.trim().length === 0) return;

    socket.emit('chat', { author: currentUser, body: inputValue.trim() });
    setInputValue('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.chat()}>
      <div className={styles.chatHeader()}>
        <span>Nest Chat App</span>
        <LogoutButton />
      </div>
      <div className={styles.chatMessageList()}>
        {messages.map((message, idx) => {
          const isUserMessage = currentUser === message.author;
          return (
            <div
              key={idx}
              className={`${styles.chatMessage({ align: isUserMessage ? 'end' : undefined })}`}
            >
              <div
                className={styles.chatMessageWrapper({ align: isUserMessage ? 'end' : undefined })}
              >
                <span className={styles.chatMessageAuthor()}>
                  {isUserMessage ? 'You' : message.author}
                </span>
                <div
                  className={styles.chatMessageBubble({
                    color: isUserMessage ? 'gold' : 'lightBlue',
                    radius: isUserMessage ? 'left' : 'right',
                  })}
                >
                  <span className={styles.chatMessageBody()}>{message.body}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.chatComposer()}>
        <input
          className={styles.chatComposerInput()}
          placeholder='Type message here'
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleSendMessage}
        />
      </div>
    </div>
  );
}
