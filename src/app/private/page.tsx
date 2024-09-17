import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import LogoutButton from "../login/logout-button";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <img src={data.user.user_metadata?.picture}></img>
      <p>Hello {data.user.user_metadata?.full_name}</p>
      <p>{data.user.email}</p>
      <LogoutButton />
    </>
  );
}
