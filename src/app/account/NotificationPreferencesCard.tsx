import React, { useState } from 'react';
import { AccountCard, AccountCardBody, AccountCardFooter } from '../../../../../sleepcatch/src/app/account/AccountCard';
import { LabeledCheckbox } from '@/components/ui/labeledCheckbox';  // Ensure this import is correct
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTransition } from 'react';
import { FormSubmitHandler } from '../../../../../sleepcatch/src/app/account/accountTypes';
import Tooltip from './Tooltip';

export default function NotificationPreferencesCard() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // States for each notification preference
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleSave: FormSubmitHandler = async () => {
    startTransition(async () => {
      const preferences = { emailNotifications, smsNotifications, pushNotifications };
      const res = await fetch("/api/account/notifications", {
        method: "PUT",
        body: JSON.stringify(preferences),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast({ description: "Notification preferences updated successfully!" });
      } else {
        toast({ description: "Failed to update preferences.", variant: "destructive" });
      }
    });
  };

  return (
    <AccountCard
      params={{
        header: "Notification Preferences",
        description: "Customize how you want to receive notifications.",
      }}
    >
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <AccountCardBody>
        <Tooltip text="Emails will be sent once a day.">
          <LabeledCheckbox
            label="Email Notifications"
            name="emailNotifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </Tooltip>
        <span>&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;</span>
        <Tooltip text="SMS will be sent immediately, but might arrive delayed.">
          <LabeledCheckbox
            label="SMS Notifications"
            name="smsNotifications"
            checked={smsNotifications}
            onCheckedChange={setSmsNotifications}
          />
        </Tooltip>
        <span>&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;</span>
        <Tooltip text="Activate Push Notifications for real-time Updates.">
          <LabeledCheckbox
            label="Push Notifications"
            name="pushNotifications"
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
        </Tooltip>
        </AccountCardBody>
        <AccountCardFooter description="">
          <Button type="submit" disabled={isPending}>Save Preferences</Button>
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}
