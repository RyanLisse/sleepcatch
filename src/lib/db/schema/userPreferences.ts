import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getUserPreferences } from "@/lib/api/userPreferences/queries";

import { randomUUID } from "crypto";


export const userPreferences = sqliteTable('user_preferences', {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  topicPreference: text("topic_preference"),
  userId: text("user_id").notNull(),
});


// Schema for userPreferences - used to validate API requests
export const insertUserPreferenceSchema = createInsertSchema(userPreferences);

export const insertUserPreferenceParams = createSelectSchema(userPreferences, {}).omit({ 
  id: true,
  userId: true
});

export const updateUserPreferenceSchema = createSelectSchema(userPreferences);

export const updateUserPreferenceParams = createSelectSchema(userPreferences,{}).omit({ 
  userId: true
});

export const userPreferenceIdSchema = updateUserPreferenceSchema.pick({ id: true });

// Types for userPreferences - used to type API request params and within Components
export type UserPreference = z.infer<typeof updateUserPreferenceSchema>;
export type NewUserPreference = z.infer<typeof insertUserPreferenceSchema>;
export type NewUserPreferenceParams = z.infer<typeof insertUserPreferenceParams>;
export type UpdateUserPreferenceParams = z.infer<typeof updateUserPreferenceParams>;
export type UserPreferenceId = z.infer<typeof userPreferenceIdSchema>["id"];
    
// this type infers the return from getUserPreferences() - meaning it will include any joins
export type CompleteUserPreference = Awaited<ReturnType<typeof getUserPreferences>>["userPreferences"][number];
