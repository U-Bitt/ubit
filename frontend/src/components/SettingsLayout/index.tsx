"use client";

import { SettingsSidebar } from "@/components/SettingsSidebar";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <SettingsSidebar isOpen={true} onClose={() => {}} />
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
