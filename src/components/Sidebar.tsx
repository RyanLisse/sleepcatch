import Link from "next/link";

import SidebarItems from "./SidebarItems";
import { UserButton } from "@clerk/nextjs";

import { AuthSession, getUserAuth } from "@/lib/auth/utils";
import {currentUser} from "@clerk/nextjs";

const Sidebar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return (
    <aside className="min-h-screen  min-w-52  hidden md:block p-4 pt-8 border-r border-border shadow-inner">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4 ">
          <h3 className="text-lg font-bold font-mono ml-4">SLEEPCATCH</h3>
          <SidebarItems />
        </div>
        <UserDetails session={session} />
      </div>
    </aside>
  );
};

export default Sidebar;

export const UserDetails = async ({ session }: { session: AuthSession }) => {
  if (session.session === null) return null;
  const user = await currentUser();

  if (!user?.firstName || user?.firstName.length == 0) return null;

  return (
    <Link href="/account">
      <div className="flex  items-center justify-between w-full border-t border-border pt-4 px-2">
        <div className="text-muted-foreground">
          <p className="text-xs">{user.firstName +" "+ user.lastName ?? "John Doe"}</p>
          <p className="text-xs font-light pr-4">
            {user.emailAddresses[0].emailAddress ?? "john@doe.com"}
          </p>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </Link>
  );
};
