'use client';
import { button } from '@/components/button.styles';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Chatroom, Message, User } from './chatroom.types';
import { css } from '../../../styled-system/css';
const socket: Socket = io(process.env.NEXT_PUBLIC_GATEWAY_URL!, { autoConnect: false });

const ChatroomList = ({user, type = 'active'} : {user: User, type: 'active' | 'other' | 'all'}) => {
  const [chatRooms, setChatrooms] = useState<Chatroom[]>([]);
  const getChatrooms = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/chatroom/${type === 'active' ? 'user' : 'other' }?email=${user.email}`);
    const chatrooms = (await response.json()) as Chatroom[];
    setChatrooms(chatrooms);
  };
  useEffect(() => {
     getChatrooms();

    socket.on('chat', (newMessage: Message) => {
      console.log('Detected new message', newMessage);
      getChatrooms();
    });


  }, []);

  return (
    <>
      <h2 className={css({ fontWeight: 'bold', textAlign: 'center' })}>{type === 'active' ? 'Active chatrooms' : 'Other chatrooms'}</h2>
      {chatRooms.map((chatroom) => (
        <Link
          className={button({ visual: 'solid', size: 'sm', rounded: true })}
          href={`/chatroom/${chatroom.id}`}
          key={chatroom.id}
        >
          {chatroom.name}
        </Link>
      ))}
    </>
  );
};

export default ChatroomList;
