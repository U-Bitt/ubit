"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Bell, 
  Mail, 
  Shield, 
  X,
  Save,
  Check,
  Eye,
  EyeOff
} from "lucide-react";

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsSidebar = ({ isOpen, onClose }: SettingsSidebarProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Email Settings
    email: "alex.smith@email.com",
    
    // Password Settings
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    universityUpdates: true,
    scholarshipAlerts: true,
    examReminders: true,
    applicationDeadlines: true
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('userSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({
          ...prev,
          ...parsedSettings,
          // Don't load passwords for security
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        }));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      // Clear corrupted data
      localStorage.removeItem('userSettings');
    }
  }, []);

  // Save settings to localStorage whenever settings change (except passwords)
  useEffect(() => {
    const settingsToSave = {
      email: settings.email,
      emailNotifications: settings.emailNotifications,
      pushNotifications: settings.pushNotifications,
      smsNotifications: settings.smsNotifications,
      universityUpdates: settings.universityUpdates,
      scholarshipAlerts: settings.scholarshipAlerts,
      examReminders: settings.examReminders,
      applicationDeadlines: settings.applicationDeadlines
    };
    localStorage.setItem('userSettings', JSON.stringify(settingsToSave));
  }, [
    settings.email,
    settings.emailNotifications,
    settings.pushNotifications,
    settings.smsNotifications,
    settings.universityUpdates,
    settings.scholarshipAlerts,
    settings.examReminders,
    settings.applicationDeadlines
  ]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    try {
      // Validate password change if new password is provided
      if (settings.newPassword && settings.newPassword !== settings.confirmPassword) {
        alert("New password and confirm password do not match!");
        return;
      }

      if (settings.newPassword && settings.newPassword.length < 6) {
        alert("New password must be at least 6 characters long!");
        return;
      }

      // Save to localStorage
      const settingsToSave = {
        email: settings.email,
        emailNotifications: settings.emailNotifications,
        pushNotifications: settings.pushNotifications,
        smsNotifications: settings.smsNotifications,
        universityUpdates: settings.universityUpdates,
        scholarshipAlerts: settings.scholarshipAlerts,
        examReminders: settings.examReminders,
        applicationDeadlines: settings.applicationDeadlines
      };
      
      localStorage.setItem('userSettings', JSON.stringify(settingsToSave));
      
      // Clear password fields after successful save
      setSettings(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));

      console.log("Settings saved successfully:", settingsToSave);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error('Error saving settings:', error);
      alert("Error saving settings. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay for click outside */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Settings
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Email Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="h-5 w-5" />
                  Email Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    This email will be used for notifications
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Password Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5" />
                  Password Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={settings.currentPassword}
                      onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={settings.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={settings.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Button
                      variant={settings.emailNotifications ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleInputChange("emailNotifications", !settings.emailNotifications)}
                    >
                      {settings.emailNotifications ? <Check className="h-4 w-4" /> : "Off"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications</p>
                    </div>
                    <Button
                      variant={settings.pushNotifications ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleInputChange("pushNotifications", !settings.pushNotifications)}
                    >
                      {settings.pushNotifications ? <Check className="h-4 w-4" /> : "Off"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>University Updates</Label>
                      <p className="text-sm text-muted-foreground">Updates about universities</p>
                    </div>
                    <Button
                      variant={settings.universityUpdates ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleInputChange("universityUpdates", !settings.universityUpdates)}
                    >
                      {settings.universityUpdates ? <Check className="h-4 w-4" /> : "Off"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Scholarship Alerts</Label>
                      <p className="text-sm text-muted-foreground">New scholarship opportunities</p>
                    </div>
                    <Button
                      variant={settings.scholarshipAlerts ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleInputChange("scholarshipAlerts", !settings.scholarshipAlerts)}
                    >
                      {settings.scholarshipAlerts ? <Check className="h-4 w-4" /> : "Off"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsSidebar;