import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ChatId, chatIdSchema, chats } from "@/lib/db/schema/chats";

export const getChats = async () => {
  const { session } = await getUserAuth();
  const c = await db.select().from(chats).where(eq(chats.userId, session?.user.id!));
  return { chats: c };
};

export const getChatById = async (id: ChatId) => {
  const { session } = await getUserAuth();
  const { id: chatId } = chatIdSchema.parse({ id });
  const [c] = await db.select().from(chats).where(and(eq(chats.id, chatId), eq(chats.userId, session?.user.id!)));
  return { chat: c };
};
