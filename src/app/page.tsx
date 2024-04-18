import {Button} from "@/components/ui/button";
import {getUserAuth} from "@/lib/auth/utils";
import Link from "next/link";
import NewCard from "@/components/NewCard";
import {BentoGrid} from "@/components/bento-grid";
import Griddy from "@/components/Griddy";

export default async function Home() {
    const userAuth = await getUserAuth();
    return (
        <main className="space-y-6">

            <Griddy />
        </main>
    );
}
