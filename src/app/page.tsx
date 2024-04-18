import {getUserAuth} from "@/lib/auth/utils";

import Griddy from "@/components/Griddy";
import Chat from "@/components/ChatPage";

export default async function Home() {
    const userAuth = await getUserAuth();
    return (
        <main className="space-y-6">

            <Griddy />
            <Chat />
        </main>
    );
}
