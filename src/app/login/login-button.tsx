"use client";

import { button } from "@/components/button.styles";
import { createClient }  from "@/utils/supabase/client";

export default function LoginButton(props: { nextUrl?: string }) {
  const supabase = createClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${
          props.nextUrl || ""
        }`,
      },
    });
  };

  return <button className={button({ visual: 'solid', size: 'sm', rounded: true })} onClick={handleLogin}>Login</button>;
}