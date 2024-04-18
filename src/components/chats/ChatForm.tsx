import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/chats/useOptimisticChats";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import { type Chat, insertChatParams } from "@/lib/db/schema/chats";
import {
  createChatAction,
  deleteChatAction,
  updateChatAction,
} from "@/lib/actions/chats";


const ChatForm = ({
  
  chat,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  chat?: Chat | null;
  
  openModal?: (chat?: Chat) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Chat>(insertChatParams);
  const { toast } = useToast();
  const editing = !!chat?.id;
    const [createdAt, setCreatedAt] = useState<Date | undefined>(
    chat?.createdAt,
  );

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Chat },
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
    } else {
      router.refresh();
      postSuccess && postSuccess();
    }

    toast({
      title: failed ? `Failed to ${action}` : "Success",
      description: failed ? data?.error ?? "Error" : `Chat ${action}d!`,
      variant: failed ? "destructive" : "default",
    });
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const chatParsed = await insertChatParams.safeParseAsync(payload);
    if (!chatParsed.success) {
      setErrors(chatParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = chatParsed.data;
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: {
            ...values,
          userId: "",            
            id: editing ? chat.id : "",
          },
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateChatAction({ ...values, id: chat.id })
          : await createChatAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: editing
            ? { ...chat, ...values }
            : { ...values, id: "", userId: "" }, 
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8"}>
      {/* Schema fields start */}
              <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.message ? "text-destructive" : "",
          )}
        >
          Message
        </Label>
        <Input
          type="text"
          name="message"
          className={cn(errors?.message ? "ring ring-destructive" : "")}
          defaultValue={chat?.message ?? ""}
        />
        {errors?.message ? (
          <p className="text-xs text-destructive mt-2">{errors.message[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
<div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.favorite ? "text-destructive" : "",
          )}
        >
          Favorite
        </Label>
        <br />
        <Checkbox defaultChecked={chat?.favorite} name={'favorite'} className={cn(errors?.favorite ? "ring ring-destructive" : "")} />
        {errors?.favorite ? (
          <p className="text-xs text-destructive mt-2">{errors.favorite[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
<div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.createdAt ? "text-destructive" : "",
          )}
        >
          Created At
        </Label>
        <br />
        <Popover>
          <Input
            name="createdAt"
            onChange={() => {}}
            readOnly
            value={createdAt?.toUTCString() ?? new Date().toUTCString()}
            className="hidden"
          />

          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !chat?.createdAt && "text-muted-foreground",
              )}
            >
              {createdAt ? (
                <span>{format(createdAt, "PPP")}</span>
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              onSelect={(e) => setCreatedAt(e)}
              selected={createdAt}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors?.createdAt ? (
          <p className="text-xs text-destructive mt-2">{errors.createdAt[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic && addOptimistic({ action: "delete", data: chat });
              const error = await deleteChatAction(chat.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: chat,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default ChatForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
