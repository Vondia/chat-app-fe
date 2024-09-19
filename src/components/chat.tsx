'use client';
import { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { io, Socket } from 'socket.io-client';
import * as styles from './chat.styles'; // Importing all styles under the `styles` namespace
import LogoutButton from '@/app/login/logout-button';

interface Message {

  message: string;
  time: string;
  user: {
    id: string;
    name: string;
    email: string;
  };

}

interface ChatMessage {
  id: string,
  message: Message
}

interface ChatProps {
  currentUser: { email: string; name: string };
  title: string;
  existingMessages: Message[];
  id: string;
}

const socket: Socket = io(process.env.NEXT_PUBLIC_GATEWAY_URL!, { autoConnect: false });

export function Chat({ currentUser, title, existingMessages, id }: ChatProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>(existingMessages);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('chat', (newMessage: ChatMessage) => {
      console.log('New message added', newMessage);
      if(newMessage.id !== id) return;
      setMessages((previousMessages) => [...previousMessages, newMessage.message]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat');
    };
  }, [id]);

  const handleSendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || inputValue.trim().length === 0) return;

    socket.emit('chat', {
      author: currentUser,
      body: inputValue.trim(),
      time: new Date().toISOString(),
      id: id,
    });
    setInputValue('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.chat()}>
      <div className={styles.chatHeader()}>
        <span>{title}</span>
        <LogoutButton />
      </div>
      <div className={styles.chatMessageList()}>
        {messages.map((message, idx) => {
          const isUserMessage = currentUser.email === message.user?.email;
          return (
            <div
              key={idx}
              className={`${styles.chatMessage({ align: isUserMessage ? 'end' : undefined })}`}
            >
              <div
                className={styles.chatMessageWrapper({ align: isUserMessage ? 'end' : undefined })}
              >
                <span className={styles.chatMessageAuthor()}>
                  {isUserMessage ? 'You' : message.user?.name}
                </span>
                <div
                  className={styles.chatMessageBubble({
                    color: isUserMessage ? 'gold' : 'lightBlue',
                    radius: isUserMessage ? 'left' : 'right',
                  })}
                >
                  <span className={styles.chatMessageBody()}>{message.message}</span>
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
