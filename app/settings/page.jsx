"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input, Button, useToast, Loader } from "@/components/ui";
import { useTheme } from "@/context/ThemeContext";

const TABS = [
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "account", label: "Account", icon: "🔒" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "theme", label: "Theme", icon: "🎨" },
  { id: "billing", label: "Billing", icon: "💳" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile state
  const [fullName, setFullName] = useState("Ayush Pilangwal");
  const [email, setEmail] = useState("ayush@himshakti.ai");
  const [isSaving, setIsSaving] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Mock save delay
    setTimeout(() => {
      setIsSaving(false);
      toast({
        message: "Profile updated successfully!",
        type: "success",
      });
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              ⚙️ Settings
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage your account preferences and application settings.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Nav */}
            <div className="md:w-64 shrink-0">
              <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap md:whitespace-normal text-left
                      ${
                        activeTab === tab.id
                          ? "bg-brand-green text-white shadow-md"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                      }
                    `}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Panel */}
            <div className="flex-1 min-w-0">
              <div className="bg-white dark:bg-brand-dark-surface rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                
                {/* Profile Section */}
                {activeTab === "profile" && (
                  <div className="p-6 sm:p-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Profile Information
                    </h2>
                    <form onSubmit={handleSaveProfile} className="max-w-md space-y-6">
                      <Input
                        label="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={isSaving}
                        >
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Theme Section */}
                {activeTab === "theme" && (
                  <div className="p-6 sm:p-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Appearance
                    </h2>
                    <div className="max-w-md">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                        Customize how HimShakti AI looks on your device.
                      </p>
                      
                      <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {theme === "dark" ? "Dark Mode Active" : "Light Mode Active"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Current mode is synchronized with your selection.
                          </p>
                        </div>
                        <Button variant="secondary" onClick={toggleTheme}>
                          Switch to {theme === "dark" ? "Light" : "Dark"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other Sections (Coming Soon) */}
                {["account", "notifications", "billing"].includes(activeTab) && (
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                        {activeTab}
                      </h2>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        Coming Soon
                      </span>
                    </div>
                    
                    <div className="space-y-6 opacity-60 pointer-events-none">
                      <div className="space-y-4">
                        <Loader type="skeleton" className="h-4 w-1/4" />
                        <Loader type="skeleton" className="h-10 w-full max-w-md" />
                      </div>
                      <div className="space-y-4">
                        <Loader type="skeleton" className="h-4 w-1/3" />
                        <Loader type="skeleton" className="h-10 w-full max-w-md" />
                      </div>
                      <div className="pt-4">
                        <Loader type="skeleton" className="h-10 w-32" />
                      </div>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
