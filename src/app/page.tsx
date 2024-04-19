import {getUserAuth} from "@/lib/auth/utils";

import Griddy from "@/components/Griddy";


export default async function Home() {
    const userAuth = await getUserAuth();
    return (
        <main className="space-y-6">

            <Griddy />

        </main>
    );
}
