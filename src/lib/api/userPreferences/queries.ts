import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type UserPreferenceId, userPreferenceIdSchema, userPreferences } from "@/lib/db/schema/userPreferences";

export const getUserPreferences = async () => {
  const { session } = await getUserAuth();
  const u = await db.select().from(userPreferences).where(eq(userPreferences.userId, session?.user.id!));
  return { userPreferences: u };
};

export const getUserPreferenceById = async (id: UserPreferenceId) => {
  const { session } = await getUserAuth();
  const { id: userPreferenceId } = userPreferenceIdSchema.parse({ id });
  const [u] = await db.select().from(userPreferences).where(and(eq(userPreferences.id, userPreferenceId), eq(userPreferences.userId, session?.user.id!)));
  return { userPreference: u };
};
