import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import {
  UserPreferenceId,
  NewUserPreferenceParams,
  UpdateUserPreferenceParams,
  updateUserPreferenceSchema,
  insertUserPreferenceSchema,
  userPreferences,
  userPreferenceIdSchema
} from "@/lib/db/schema/userPreferences";
import { getUserAuth } from "@/lib/auth/utils";

export const createUserPreference = async (userPreference: { userId: string | undefined; topicPreference: string }) => {
  const { session } = await getUserAuth();
  const newUserPreference = insertUserPreferenceSchema.parse({ ...userPreference, userId: session?.user.id! });
  try {
    const [u] =  await db.insert(userPreferences).values(newUserPreference).returning();
    return { userPreference: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUserPreference = async (id: UserPreferenceId, userPreference: UpdateUserPreferenceParams) => {
  const { session } = await getUserAuth();
  const { id: userPreferenceId } = userPreferenceIdSchema.parse({ id });
  const newUserPreference = updateUserPreferenceSchema.parse({ ...userPreference, userId: session?.user.id! });
  try {
    const [u] =  await db
     .update(userPreferences)
     .set(newUserPreference)
     .where(and(eq(userPreferences.id, userPreferenceId!), eq(userPreferences.userId, session?.user.id!)))
     .returning();
    return { userPreference: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUserPreference = async (id: UserPreferenceId) => {
  const { session } = await getUserAuth();
  const { id: userPreferenceId } = userPreferenceIdSchema.parse({ id });
  try {
    const [u] =  await db.delete(userPreferences).where(and(eq(userPreferences.id, userPreferenceId!), eq(userPreferences.userId, session?.user.id!)))
    .returning();
    return { userPreference: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
