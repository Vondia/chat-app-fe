import { redirect } from 'next/navigation';
import { Chat } from '@/components/chat';
import { createClient } from '@/utils/supabase/server';
import ChatroomList from '../ChatroomList';
import { css } from '../../../../styled-system/css';
import { User } from '../chatroom.types';
export default async function Home({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }
  const currentUser: User = {
    email: data.user.email!,
    name: data.user.user_metadata?.full_name,
    id: data.user.id!,
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/chatroom/${params.id}`);
  if (response.status !== 200) {
    redirect('/');
  }
  const chatroom = await response.json();

  return (
    <div
      className={css({
        display: 'flex',
        width: 'full',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <div className={css({ padding: '1rem', alignSelf: 'flex-start' })}>
        <ChatroomList user={currentUser} type="active" />
        <ChatroomList user={currentUser} type="other" />
      </div>
      <Chat
        id={chatroom.id}
        currentUser={currentUser}
        existingMessages={chatroom.messages ? chatroom.messages : []}
        title={chatroom.name}
        members={chatroom.users}
      />
    </div>
  );
}
