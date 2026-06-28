"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@toolvault/ui";
import { Button } from "@toolvault/ui";
import { Globe, Mail, Database, Key, Bell, Save, Shield, Upload, HardDrive } from "lucide-react";

interface SettingsSection {
  id: string;
  name: string;
  icon: any;
}

const sections: SettingsSection[] = [
  { id: "general", name: "General", icon: Globe },
  { id: "email", name: "Email / SMTP", icon: Mail },
  { id: "storage", name: "Storage / S3", icon: Database },
  { id: "api-keys", name: "API Keys", icon: Key },
  { id: "security", name: "Security", icon: Shield },
];

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "ToolVault Pro",
    siteUrl: "https://toolvaultpro.com",
    supportEmail: "support@toolvaultpro.com",
    defaultPlan: "free",
    maxUploadSize: "100",
    maintenanceMode: false,
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPass: "",
    smtpFrom: "noreply@toolvaultpro.com",
    s3Bucket: "toolvault-files",
    s3Region: "us-east-1",
    s3AccessKey: "",
    s3SecretKey: "",
    stripeSecretKey: "",
    stripePublishableKey: "",
    stripeWebhookSecret: "",
    anthropicApiKey: "",
    removeBgApiKey: "",
    requireEmailVerification: true,
    allowGoogleAuth: true,
    sessionTimeout: "24",
  });

  const handleSave = () => {
    localStorage.setItem("toolvault_admin_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSetting = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-gray-400 text-sm">Configure your platform</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" /> {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Section Nav */}
        <div className="w-48 space-y-1">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeSection === s.id
                    ? "bg-red-600/20 text-red-400"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {s.name}
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-4">
          {activeSection === "general" && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">General Settings</CardTitle>
                <CardDescription className="text-gray-400">Basic site configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Site Name</label>
                    <input
                      value={settings.siteName}
                      onChange={(e) => updateSetting("siteName", e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Site URL</label>
                    <input
                      value={settings.siteUrl}
                      onChange={(e) => updateSetting("siteUrl", e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Support Email</label>
                    <input
                      value={settings.supportEmail}
                      onChange={(e) => updateSetting("supportEmail", e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Max Upload Size (MB)</label>
                    <input
                      type="number"
                      value={settings.maxUploadSize}
                      onChange={(e) => updateSetting("maxUploadSize", e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-sm text-white">Maintenance Mode</p>
                    <p className="text-xs text-gray-500">Show maintenance page to all non-admin users</p>
                  </div>
                  <button
                    onClick={() => updateSetting("maintenanceMode", !settings.maintenanceMode)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      settings.maintenanceMode ? "bg-red-600" : "bg-gray-700"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.maintenanceMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "email" && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Email / SMTP Settings</CardTitle>
                <CardDescription className="text-gray-400">Configure email delivery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">SMTP Host</label>
                    <input
                      value={settings.smtpHost}
                      onChange={(e) => updateSetting("smtpHost", e.target.value)}
                      placeholder="smtp.gmail.com"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">SMTP Port</label>
                    <input
                      value={settings.smtpPort}
                      onChange={(e) => updateSetting("smtpPort", e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">SMTP Username</label>
                    <input
                      value={settings.smtpUser}
                      onChange={(e) => updateSetting("smtpUser", e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">SMTP Password</label>
                    <input
                      type="password"
                      value={settings.smtpPass}
                      onChange={(e) => updateSetting("smtpPass", e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">From Email</label>
                    <input
                      value={settings.smtpFrom}
                      onChange={(e) => updateSetting("smtpFrom", e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "storage" && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Storage / S3 Settings</CardTitle>
                <CardDescription className="text-gray-400">Configure file storage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">S3 Bucket</label>
                    <input
                      value={settings.s3Bucket}
                      onChange={(e) => updateSetting("s3Bucket", e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">S3 Region</label>
                    <input
                      value={settings.s3Region}
                      onChange={(e) => updateSetting("s3Region", e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Access Key</label>
                    <input
                      type="password"
                      value={settings.s3AccessKey}
                      onChange={(e) => updateSetting("s3AccessKey", e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Secret Key</label>
                    <input
                      type="password"
                      value={settings.s3SecretKey}
                      onChange={(e) => updateSetting("s3SecretKey", e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "api-keys" && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">API Keys</CardTitle>
                <CardDescription className="text-gray-400">Third-party service keys</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-white">Stripe</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Secret Key</label>
                      <input
                        type="password"
                        value={settings.stripeSecretKey}
                        onChange={(e) => updateSetting("stripeSecretKey", e.target.value)}
                        placeholder="sk_..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Publishable Key</label>
                      <input
                        type="password"
                        value={settings.stripePublishableKey}
                        onChange={(e) => updateSetting("stripePublishableKey", e.target.value)}
                        placeholder="pk_..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Webhook Secret</label>
                    <input
                      type="password"
                      value={settings.stripeWebhookSecret}
                      onChange={(e) => updateSetting("stripeWebhookSecret", e.target.value)}
                      placeholder="whsec_..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
                <div className="border-t border-gray-800 pt-4 space-y-3">
                  <h3 className="text-sm font-medium text-white">AI Services</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Anthropic API Key</label>
                      <input
                        type="password"
                        value={settings.anthropicApiKey}
                        onChange={(e) => updateSetting("anthropicApiKey", e.target.value)}
                        placeholder="sk-ant-..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Remove.bg API Key</label>
                      <input
                        type="password"
                        value={settings.removeBgApiKey}
                        onChange={(e) => updateSetting("removeBgApiKey", e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "security" && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
                <CardDescription className="text-gray-400">Authentication and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-sm text-white">Require Email Verification</p>
                    <p className="text-xs text-gray-500">Users must verify email before accessing tools</p>
                  </div>
                  <button
                    onClick={() => updateSetting("requireEmailVerification", !settings.requireEmailVerification)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      settings.requireEmailVerification ? "bg-red-600" : "bg-gray-700"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.requireEmailVerification ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-sm text-white">Allow Google Auth</p>
                    <p className="text-xs text-gray-500">Enable Google OAuth login</p>
                  </div>
                  <button
                    onClick={() => updateSetting("allowGoogleAuth", !settings.allowGoogleAuth)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      settings.allowGoogleAuth ? "bg-red-600" : "bg-gray-700"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.allowGoogleAuth ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Session Timeout (hours)</label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => updateSetting("sessionTimeout", e.target.value)}
                    className="w-32 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
