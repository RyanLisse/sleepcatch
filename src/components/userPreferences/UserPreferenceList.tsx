"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { type UserPreference, CompleteUserPreference } from "@/lib/db/schema/userPreferences";
import Modal from "@/components/shared/Modal";

import { useOptimisticUserPreferences } from "@/app/user-preferences/useOptimisticUserPreferences";
import { Button } from "@/components/ui/button";
import UserPreferenceForm from "./UserPreferenceForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (userPreference?: UserPreference) => void;

export default function UserPreferenceList({
  userPreferences,
   
}: {
  userPreferences: CompleteUserPreference[];
   
}) {
  const { optimisticUserPreferences, addOptimisticUserPreference } = useOptimisticUserPreferences(
    userPreferences,
     
  );
  const [open, setOpen] = useState(false);
  const [activeUserPreference, setActiveUserPreference] = useState<UserPreference | null>(null);
  const openModal = (userPreference?: UserPreference) => {
    setOpen(true);
    userPreference ? setActiveUserPreference(userPreference) : setActiveUserPreference(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeUserPreference ? "Edit UserPreference" : "Create UserPreference"}
      >
        <UserPreferenceForm
          userPreference={activeUserPreference}
          addOptimistic={addOptimisticUserPreference}
          openModal={openModal}
          closeModal={closeModal}
          
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticUserPreferences.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticUserPreferences.map((userPreference) => (
            <UserPreference
              userPreference={userPreference}
              key={userPreference.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const UserPreference = ({
  userPreference,
  openModal,
}: {
  userPreference: CompleteUserPreference;
  openModal: TOpenModal;
}) => {
  const optimistic = userPreference.id === "optimistic";
  const deleting = userPreference.id === "delete";
  const mutating = optimistic || deleting;
  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{userPreference.topic_preference}</div>
      </div>
      <Button
        onClick={() => openModal(userPreference)}
        disabled={mutating}
        variant={"ghost"}
      >
        Edit
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No user preferences
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new user preference.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New User Preferences </Button>
      </div>
    </div>
  );
};
