import ChatRoomForm from "@/components/create-room-form";
import { createClient } from "@/utils/supabase/server";


    export default async function CreateChatroom() {
        const supabase = createClient();

        const { data, error } = await supabase.auth.getUser();
    return (
        <div>
        <h1>Create a Chat Room</h1>
        <ChatRoomForm userData={data} userError={error} />
      </div>
    )
};
