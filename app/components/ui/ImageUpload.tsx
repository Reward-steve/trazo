"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon, Loader2, RefreshCw } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  error?: string;
}

export default function ImageUpload({
  value,
  onChange,
  error,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed (JPG, PNG, WEBP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image is too large. Please use an image under 5MB.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
      );
      formData.append("quality", "auto");
      formData.append("fetch_format", "auto");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload?quality=auto&fetch_format=auto`,
        { method: "POST", body: formData },
      );

      const data = await res.json();

      if (data.secure_url) {
        onChange(data.secure_url);
      } else {
        console.error("Cloudinary error:", data.error?.message ?? data);
        const reason = data.error?.message ?? "";
        if (reason.includes("preset")) {
          alert(
            "Image upload is not configured correctly. Please contact support.",
          );
        } else if (reason.includes("format")) {
          alert("This file format is not supported. Please use JPG or PNG.");
        } else {
          alert("Image upload failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert(
        "Could not upload image. Check your internet connection and try again.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {value ? (
        /* ── Preview state ── */
        <div className="flex flex-col gap-2">
          {/* Image preview */}
          <div className="relative w-full aspect-square max-w-[160px] mx-auto rounded-2xl overflow-hidden border border-border bg-surface-alt">
            {uploading ? (
              // Uploading overlay — shown when replacing image
              <div className="absolute inset-0 bg-surface/80 flex flex-col items-center justify-center gap-2 z-10">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
                <span className="text-xs text-text-muted">Uploading…</span>
              </div>
            ) : null}
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>

          {/* Action buttons — always visible, never hidden on mobile */}
          <div className="flex gap-2 max-w-[160px] mx-auto w-full">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex-1 flex items-center justify-center gap-1.5 bg-surface-alt border border-border text-text-muted hover:text-primary hover:border-primary text-xs font-medium py-2 rounded-xl transition-colors disabled:opacity-50"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Change
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              disabled={uploading}
              className="flex-1 flex items-center justify-center gap-1.5 bg-surface-alt border border-border text-text-muted hover:text-red-500 hover:border-red-300 text-xs font-medium py-2 rounded-xl transition-colors disabled:opacity-50"
            >
              <X className="h-3.5 w-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        /* ── Upload area ── */
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`
            w-full rounded-2xl border-2 border-dashed
            flex flex-col items-center justify-center gap-3
            py-10 cursor-pointer transition-colors duration-200
            ${
              dragOver
                ? "border-primary bg-bubble-out"
                : "border-border hover:border-primary/50 hover:bg-bubble-out/40"
            }
            ${uploading ? "cursor-not-allowed opacity-60 pointer-events-none" : ""}
          `}
        >
          {uploading ? (
            <>
              <Loader2 className="h-7 w-7 text-primary animate-spin" />
              <span className="text-xs text-text-muted">Uploading…</span>
            </>
          ) : (
            <>
              <div className="h-12 w-12 bg-bubble-out rounded-2xl flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-primary-dark" />
              </div>
              <div className="text-center px-4">
                <p className="text-sm font-medium text-text">
                  Click or drag to upload
                </p>
                <p className="text-[11px] text-text-muted mt-0.5">
                  PNG, JPG up to 5MB
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors">
                <Upload className="h-3.5 w-3.5" />
                Choose image
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  );
}
