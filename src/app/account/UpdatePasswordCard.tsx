import React, { useState } from 'react';
import { AccountCard, AccountCardBody, AccountCardFooter } from './AccountCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useTransition } from 'react';
import Modal from './Modal';

export default function UpdatePasswordCard() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setModalOpen] = useState(false); 
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const newPassword = form.get('newPassword') as string;

    // Add password validation logic here

    startTransition(async () => {
      const res = await fetch("/api/account/password", {
        method: "PUT",
        body: JSON.stringify({ newPassword }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast({ description: "Password updated successfully!" });
        setModalOpen(false);
      } else {
        toast({ description: "Failed to update password.", variant: "destructive" });
      }
    });
  };

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Change Password</Button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <AccountCard
          params={{
            header: "Update Password",
            description: "Enter your new password below.",
          }}
        >
          <form onSubmit={handleSubmit}>
            <AccountCardBody>
              <Input type="password" name="newPassword" required />
            </AccountCardBody>
            <AccountCardFooter description="">
              <Button type="submit" disabled={isPending}>Update Password</Button>
            </AccountCardFooter>
          </form>
        </AccountCard>
      </Modal>
    </>
  );
}
