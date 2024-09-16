"use client"
import { Chat } from '@/components/chat';
import { css } from '../../styled-system/css';
import { useState } from 'react';

export default function Home() {
    const [currentUser, setCurrentUser] = useState(null);
  return (
    <div className={css({ display: "flex", width: 'full', height: '100vh', alignItems: 'center', justifyContent: 'center' })}>
      <Chat currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
  </div>
  )
}
