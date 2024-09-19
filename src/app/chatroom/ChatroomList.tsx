'use client';
import { button } from '@/components/button.styles';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Chatroom, Message } from './chatroom.types';
const socket: Socket = io(process.env.NEXT_PUBLIC_GATEWAY_URL!, { autoConnect: false });


const ChatroomList = () => {
  const [chatRooms, setChatrooms] = useState<Chatroom[]>([]);
  const getChatrooms = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/chatroom`);
    const chatrooms = await response.json() as Chatroom[];
    setChatrooms(chatrooms);
  };
  useEffect(() => {
    socket.connect();
    socket.on('connect', async () => {
      await getChatrooms();
    });
    socket.on('chat', (newMessage: Message) => {
      console.log('Detected new message', newMessage);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat');
    };
  }, []);

  return (
    <>
      <p>Chatroomlist</p>
      {chatRooms.map((chatroom) => (
        <Link className={button({ visual: 'solid', size: 'sm', rounded: true })}href={`/chatroom/${chatroom.id}`} key={chatroom.id}>{chatroom.name}</Link>
      ))}
    </>
  );
};

export default ChatroomList;
