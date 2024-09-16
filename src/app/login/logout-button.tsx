"use client";

import { button } from "@/components/button.styles";
import { createClient }  from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return <button className={button({ visual: 'solid', size: 'sm', rounded: true })} onClick={handleLogout}>Logout</button>;
}