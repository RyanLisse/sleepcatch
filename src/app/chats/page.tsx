import ChatList from "@/components/chats/ChatList";
import { getChats } from "@/lib/api/chats/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function Chats() {
  await checkAuth();
  const { chats } = await getChats();
  

  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Chats</h1>
        </div>
        <ChatList chats={chats}  />
      </div>
    </main>
  );
}
