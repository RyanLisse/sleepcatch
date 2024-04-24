// Interface for notification preferences settings
export interface NotificationPreferences {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
}
  
// Interface for privacy settings
export interface PrivacySettings {
    profileVisibility: boolean;
    dataDownload: boolean;
}
  
// Generic form handler interface
export interface FormSubmitHandler {
    (): Promise<void>;
}