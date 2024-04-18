"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { type Chat, CompleteChat } from "@/lib/db/schema/chats";
import Modal from "@/components/shared/Modal";

import { useOptimisticChats } from "@/app/chats/useOptimisticChats";
import { Button } from "@/components/ui/button";
import ChatForm from "./ChatForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (chat?: Chat) => void;

export default function ChatList({
  chats,
   
}: {
  chats: CompleteChat[];
   
}) {
  const { optimisticChats, addOptimisticChat } = useOptimisticChats(
    chats,
     
  );
  const [open, setOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const openModal = (chat?: Chat) => {
    setOpen(true);
    chat ? setActiveChat(chat) : setActiveChat(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeChat ? "Edit Chat" : "Create Chat"}
      >
        <ChatForm
          chat={activeChat}
          addOptimistic={addOptimisticChat}
          openModal={openModal}
          closeModal={closeModal}
          
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticChats.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticChats.map((chat) => (
            <Chat
              chat={chat}
              key={chat.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Chat = ({
  chat,
  openModal,
}: {
  chat: CompleteChat;
  openModal: TOpenModal;
}) => {
  const optimistic = chat.id === "optimistic";
  const deleting = chat.id === "delete";
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
        <div>{chat.message}</div>
      </div>
      <Button
        onClick={() => openModal(chat)}
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
        No chats
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new chat.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Chats </Button>
      </div>
    </div>
  );
};
