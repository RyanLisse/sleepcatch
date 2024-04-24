"use client";
import React, { useState } from 'react'; // Add useState here
import UpdateNameCard from "./UpdateNameCard";
import UpdateEmailCard from "./UpdateEmailCard";
import UpdatePasswordCard from "./UpdatePasswordCard";
import NotificationPreferencesCard from "./NotificationPreferencesCard";
import PrivacySettingsCard from "./PrivacySettingsCard";
import { AuthSession } from "@/lib/auth/utils";
import Modal from './Modal';
import { Button } from "@/components/ui/button";

export default function UserSettings({
  session,
}: {
  session: AuthSession["session"];
}) {
  const [isModalOpen, setModalOpen] = useState(false); // Initialize state for modal visibility

  return (
    <main>
      <h1 className="text-2xl font-semibold my-4">Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UpdateNameCard name={session?.user.name ?? ""} />
        <UpdateEmailCard email={session?.user.email ?? ""} />
        <Button className="w-1/4 self-center" onClick={() => setModalOpen(true)}>Change Password</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <NotificationPreferencesCard />
        <PrivacySettingsCard />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <UpdatePasswordCard />
      </Modal>
    </main>
  );
}
