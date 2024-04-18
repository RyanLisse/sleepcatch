
import { type Chat, type CompleteChat } from "@/lib/db/schema/chats";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Chat>) => void;

export const useOptimisticChats = (
  chats: CompleteChat[],
  
) => {
  const [optimisticChats, addOptimisticChat] = useOptimistic(
    chats,
    (
      currentState: CompleteChat[],
      action: OptimisticAction<Chat>,
    ): CompleteChat[] => {
      const { data } = action;

      

      const optimisticChat = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticChat]
            : [...currentState, optimisticChat];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticChat } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticChat, optimisticChats };
};
