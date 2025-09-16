"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Save,
  Check,
  User,
  Mail,
  Eye,
  EyeOff
} from "lucide-react";

export const Settings = () => {
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <SettingsIcon className="h-8 w-8" />
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Email Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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
                  This email will be used for notifications and account recovery
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Password Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
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
                    placeholder="Enter your current password"
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
                  placeholder="Enter your new password"
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={settings.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirm your new password"
                />
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>Password requirements:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>At least 8 characters long</li>
                  <li>Contains uppercase and lowercase letters</li>
                  <li>Contains at least one number</li>
                  <li>Contains at least one special character</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Button
                    variant={settings.smsNotifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleInputChange("smsNotifications", !settings.smsNotifications)}
                  >
                    {settings.smsNotifications ? <Check className="h-4 w-4" /> : "Off"}
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-4">Notification Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>University Updates</Label>
                      <p className="text-sm text-muted-foreground">Updates about your saved universities</p>
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
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Exam Reminders</Label>
                      <p className="text-sm text-muted-foreground">Reminders for upcoming exams</p>
                    </div>
                    <Button
                      variant={settings.examReminders ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleInputChange("examReminders", !settings.examReminders)}
                    >
                      {settings.examReminders ? <Check className="h-4 w-4" /> : "Off"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Application Deadlines</Label>
                      <p className="text-sm text-muted-foreground">Deadline reminders for applications</p>
                    </div>
                    <Button
                      variant={settings.applicationDeadlines ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleInputChange("applicationDeadlines", !settings.applicationDeadlines)}
                    >
                      {settings.applicationDeadlines ? <Check className="h-4 w-4" /> : "Off"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
