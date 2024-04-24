import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Tooltip from './Tooltip';

export default function UpdateEmailCard({ email }: { email: string }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const { email } = Object.fromEntries(form.entries()) as { email: string };
    if (email.length < 3) {
      toast({
        description: "Email must be longer than 3 characters.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const res = await fetch("/api/account", {
        method: "PUT",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200)
        toast({ description: "Successfully updated email!" });
      router.refresh();
    });
  };

  return (
    <AccountCard
      params={{
        header: "Your Email",
        description: 
          "Please enter the email address you want to use with your account.",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Tooltip text="Make sure to use an email you frequently check as important account notifications will be sent here.">
          <AccountCardBody>
            <Input defaultValue={email ?? ""} name="email" disabled={true} />
          </AccountCardBody>
        </Tooltip>
        <AccountCardFooter description="We will email vou to verify the change.">
          <Button disabled={true}>Update Email</Button>
        </AccountCardFooter>
      </form>
    </AccountCard>
  );

}

