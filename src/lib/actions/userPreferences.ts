"use server";

import { revalidatePath } from "next/cache";
import {
  createUserPreference,
  deleteUserPreference,
  updateUserPreference,
} from "@/lib/api/userPreferences/mutations";
import {
  UserPreferenceId,
  NewUserPreferenceParams,
  UpdateUserPreferenceParams,
  userPreferenceIdSchema,
  insertUserPreferenceParams,
  updateUserPreferenceParams,
} from "@/lib/db/schema/userPreferences";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUserPreferences = () => revalidatePath("/user-preferences");

export const createUserPreferenceAction = async (input: { topicPreference: string }) => {
  try {
    const payload = insertUserPreferenceParams.parse(input);
    await createUserPreference(payload);
    revalidateUserPreferences();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUserPreferenceAction = async (input: UpdateUserPreferenceParams) => {
  try {
    const payload = updateUserPreferenceParams.parse(input);
    await updateUserPreference(payload.id, payload);
    revalidateUserPreferences();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUserPreferenceAction = async (input: UserPreferenceId) => {
  try {
    const payload = userPreferenceIdSchema.parse({ id: input });
    await deleteUserPreference(payload.id);
    revalidateUserPreferences();
  } catch (e) {
    return handleErrors(e);
  }
};
