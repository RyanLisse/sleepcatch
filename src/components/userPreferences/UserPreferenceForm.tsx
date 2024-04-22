import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/user-preferences/useOptimisticUserPreferences";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


import { type UserPreference, insertUserPreferenceParams } from "@/lib/db/schema/userPreferences";
import {
  createUserPreferenceAction,
  deleteUserPreferenceAction,
  updateUserPreferenceAction,
} from "@/lib/actions/userPreferences";


const UserPreferenceForm = ({
  
  userPreference,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  userPreference?: UserPreference | null;
  
  openModal?: (userPreference?: UserPreference) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<UserPreference>(insertUserPreferenceParams);
  const { toast } = useToast();
  const editing = !!userPreference?.id;
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();

  const onSuccess = (
    action: Action,
    data?: { error: string; values: UserPreference },
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
      description: failed ? data?.error ?? "Error" : `UserPreference ${action}d!`,
      variant: failed ? "destructive" : "default",
    });
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const userPreferenceParsed = await insertUserPreferenceParams.safeParseAsync(payload);
    if (!userPreferenceParsed.success) {
      setErrors(userPreferenceParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = userPreferenceParsed.data;
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: {
            ...values,
          userId: "",            
            id: editing ? userPreference.id : "",
          },
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateUserPreferenceAction({ ...values, id: userPreference.id })
          : await createUserPreferenceAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: editing
            ? { ...userPreference, ...values }
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
            errors?.topicPreference ? "text-destructive" : "",
          )}
        >
          Topic Preference
        </Label>
        <Input
          type="text"
          name="topicPreference"
          className={cn(errors?.topicPreference ? "ring ring-destructive" : "")}
          defaultValue={userPreference?.topicPreference ?? ""}
        />
        {errors?.topicPreference ? (
          <p className="text-xs text-destructive mt-2">{errors.topicPreference[0]}</p>
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
              addOptimistic && addOptimistic({ action: "delete", data: userPreference });
              const error = await deleteUserPreferenceAction(userPreference.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: userPreference,
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

export default UserPreferenceForm;

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
