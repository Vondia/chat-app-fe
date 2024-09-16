import { redirect } from "next/navigation";
import { Chat } from '@/components/chat';
import { css } from '../../styled-system/css';
import { createClient } from "@/utils/supabase/server";
export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const currentUser = data.user.user_metadata?.full_name;

  return (
    <div className={css({ display: "flex", width: 'full', height: '100vh', alignItems: 'center', justifyContent: 'center' })}>
      <Chat currentUser={currentUser}  />
  </div>
  )
}
