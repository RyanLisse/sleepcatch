import UserSettings from "./UserSettings";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";

export default async function Account() {
  await checkAuth();
  const { session } = await getUserAuth();
  
  return (
    <main>
      <div className="space-y-4">
        <UserSettings session={session} />
      </div>
    </main>
  );
}
