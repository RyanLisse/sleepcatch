import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getChats } from "@/lib/api/chats/queries";

import { randomUUID } from "crypto";


export const chats = sqliteTable('chats', {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  message: text("message").notNull(),
  favorite: integer("favorite", { mode: "boolean" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  userId: text("user_id").notNull(),
});


// Schema for chats - used to validate API requests
export const insertChatSchema = createInsertSchema(chats);

export const insertChatParams = createSelectSchema(chats, {
  favorite: z.coerce.boolean(),
  createdAt: z.coerce.date()
}).omit({ 
  id: true,
  userId: true
});

export const updateChatSchema = createSelectSchema(chats);

export const updateChatParams = createSelectSchema(chats,{
  favorite: z.coerce.boolean(),
  createdAt: z.coerce.date()
}).omit({ 
  userId: true
});

export const chatIdSchema = updateChatSchema.pick({ id: true });

// Types for chats - used to type API request params and within Components
export type Chat = z.infer<typeof updateChatSchema>;
export type NewChat = z.infer<typeof insertChatSchema>;
export type NewChatParams = z.infer<typeof insertChatParams>;
export type UpdateChatParams = z.infer<typeof updateChatParams>;
export type ChatId = z.infer<typeof chatIdSchema>["id"];
    
// this type infers the return from getChats() - meaning it will include any joins
export type CompleteChat = Awaited<ReturnType<typeof getChats>>["chats"][number];

