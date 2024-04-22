import UserPreferenceList from "@/components/userPreferences/UserPreferenceList";
import { getUserPreferences } from "@/lib/api/userPreferences/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function UserPreferences() {
  await checkAuth();
  const { userPreferences } = await getUserPreferences();
  

  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">User Preferences</h1>
        </div>
        <UserPreferenceList userPreferences={userPreferences}  />
      </div>
    </main>
  );
}
