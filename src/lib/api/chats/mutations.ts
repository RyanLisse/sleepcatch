import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  ChatId, 
  NewChatParams,
  UpdateChatParams, 
  updateChatSchema,
  insertChatSchema, 
  chats,
  chatIdSchema 
} from "@/lib/db/schema/chats";
import { getUserAuth } from "@/lib/auth/utils";

export const createChat = async (chat: NewChatParams) => {
  const { session } = await getUserAuth();
  const newChat = insertChatSchema.parse({ ...chat, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(chats).values(newChat).returning();
    return { chat: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateChat = async (id: ChatId, chat: UpdateChatParams) => {
  const { session } = await getUserAuth();
  const { id: chatId } = chatIdSchema.parse({ id });
  const newChat = updateChatSchema.parse({ ...chat, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(chats)
     .set(newChat)
     .where(and(eq(chats.id, chatId!), eq(chats.userId, session?.user.id!)))
     .returning();
    return { chat: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteChat = async (id: ChatId) => {
  const { session } = await getUserAuth();
  const { id: chatId } = chatIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(chats).where(and(eq(chats.id, chatId!), eq(chats.userId, session?.user.id!)))
    .returning();
    return { chat: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

