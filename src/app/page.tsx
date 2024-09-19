import { redirect } from "next/navigation";
import { css } from '../../styled-system/css';
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { button } from "@/components/button.styles";
export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className={css({ display: "flex", width: 'full', height: '100vh', alignItems: 'center', justifyContent: 'center' })}>
      <Link href="/chatroom/8" className={button({ visual: 'solid', size: 'lg', rounded: true })}>Go to General chat</Link>
  </div>
  )
}
