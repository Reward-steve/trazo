"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Incorrect password. Try again.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-3">
            <Lock className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-black text-gray-900">Admin Access</h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter your admin password to continue
          </p>
        </div>
        <div className="space-y-4">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            error={error}
          />
          <Button onClick={handleLogin} loading={loading} className="w-full">
            Access Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
