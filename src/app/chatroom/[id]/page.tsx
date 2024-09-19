import { redirect } from 'next/navigation';
import { Chat } from '@/components/chat';
import { css } from '../../../../styled-system/css';
import { createClient } from '@/utils/supabase/server';
export default async function Home({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }
  const currentUser = { email: data.user.email!, name: data.user.user_metadata?.full_name };
  const response = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/chatroom/${params.id}`);
 if(response.status !== 200){ 
   redirect('/')
 }
  console.log(response);
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
      <Chat id={chatroom.id} currentUser={currentUser} existingMessages={chatroom.messages} title={chatroom.name} />
    </div>
  );
}
