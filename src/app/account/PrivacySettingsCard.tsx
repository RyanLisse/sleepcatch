import React from 'react';
import { AccountCard, AccountCardBody, AccountCardFooter } from './AccountCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTransition } from 'react';
import { PrivacySettings, FormSubmitHandler } from './accountTypes';
import { LabeledCheckbox } from '@/components/ui/labeledCheckbox';
import Tooltip from './Tooltip';

export default function PrivacySettingsCard() {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
  
    // Assuming you handle state for checkboxes
    const [profileVisibility, setProfileVisibility] = React.useState(false);
    const [dataDownload, setDataDownload] = React.useState(false);
  
    const handleSave: FormSubmitHandler = async () => {
        startTransition(async () => {
            const privacySettings = { profileVisibility, dataDownload };
            const res = await fetch("/api/account/privacy", {
                method: "PUT",
                body: JSON.stringify(privacySettings),
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) {
                toast({ description: "Privacy settings updated successfully!" });
            } else {
                toast({ description: "Failed to update settings.", variant: "destructive" });
            }
        });
    };
  
    return (
      <AccountCard
        params={{
          header: "Privacy Settings",
          description: "Manage your privacy settings here."
        }}
      >
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <AccountCardBody>
          <Tooltip text="Define how private or public you want your profile to be.">
            <LabeledCheckbox
                label="Profile Visibility"
                name="profileVisibility"
                checked={profileVisibility}
                onCheckedChange={(newCheckedState) => setProfileVisibility(newCheckedState)}
            />
          </Tooltip>
          <span>&nbsp;&nbsp;</span>
          <span>&nbsp;&nbsp;</span>
          <span>&nbsp;&nbsp;</span>
          <Tooltip text="Request downloading an aggregated dataset that is based on your activity and other things.">
            <LabeledCheckbox
                label="Data Download"
                name="dataDownload"
                checked={dataDownload}
                onCheckedChange={(newCheckedState) => setDataDownload(newCheckedState)}
            />
          </Tooltip>
          </AccountCardBody>
          <AccountCardFooter description="">
            <Button type="submit" disabled={isPending}>Save Settings</Button>
          </AccountCardFooter>
        </form>
      </AccountCard>
    );
  }