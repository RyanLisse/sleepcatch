
import { type UserPreference, type CompleteUserPreference } from "@/lib/db/schema/userPreferences";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<UserPreference>) => void;

export const useOptimisticUserPreferences = (
  userPreferences: CompleteUserPreference[],
  
) => {
  const [optimisticUserPreferences, addOptimisticUserPreference] = useOptimistic(
    userPreferences,
    (
      currentState: CompleteUserPreference[],
      action: OptimisticAction<UserPreference>,
    ): CompleteUserPreference[] => {
      const { data } = action;

      

      const optimisticUserPreference = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticUserPreference]
            : [...currentState, optimisticUserPreference];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticUserPreference } : item,
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

  return { addOptimisticUserPreference, optimisticUserPreferences };
};
