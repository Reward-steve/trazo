"use client";

import { useState } from "react";
import { ShopSettings } from "../../types";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ImageUpload from "../../components/ui/ImageUpload";

interface SettingsFormProps {
  settings: ShopSettings;
  onSuccess: () => void;
}

export default function SettingsForm({
  settings,
  onSuccess,
}: SettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    shopName: settings.shopName,
    whatsappNumber: settings.whatsappNumber,
    description: settings.description,
    logoUrl: settings.logoUrl,
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        label="Shop Name"
        value={form.shopName}
        onChange={(e) => setForm({ ...form, shopName: e.target.value })}
      />
      <Input
        label="WhatsApp Number (with country code)"
        placeholder="e.g. 2348012345678"
        value={form.whatsappNumber}
        onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Shop Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-gray-300 transition"
        />
      </div>
      <ImageUpload
        value={form.logoUrl}
        onChange={(url) => setForm({ ...form, logoUrl: url })}
      />
      <Button onClick={handleSubmit} loading={loading} className="w-full">
        {saved ? "✓ Saved!" : "Save Settings"}
      </Button>
    </div>
  );
}
