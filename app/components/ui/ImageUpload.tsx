"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

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
        // Log real error for debugging, show friendly message to user
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
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">Product Image</label>

      {value ? (
        /* Preview */
        <div className="relative w-full aspect-square max-w-[200px] rounded-xl overflow-hidden border border-gray-200 group">
          <Image
            src={value}
            alt="Product preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg text-gray-600 hover:text-red-500 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        /* Upload area */
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`
            w-full aspect-square max-w-[200px] rounded-xl border-2 border-dashed
            flex flex-col items-center justify-center gap-2 cursor-pointer
            transition-all duration-200
            ${
              dragOver
                ? "border-emerald-400 bg-emerald-50"
                : "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50"
            }
            ${uploading ? "cursor-not-allowed opacity-60" : ""}
          `}
        >
          {uploading ? (
            <>
              <Loader2 className="h-7 w-7 text-emerald-500 animate-spin" />
              <span className="text-xs text-gray-500">Uploading...</span>
            </>
          ) : (
            <>
              <div className="p-2.5 bg-gray-100 rounded-xl">
                <ImageIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="text-center px-2">
                <p className="text-xs font-medium text-gray-600">
                  Click or drag to upload
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  PNG, JPG up to 5MB
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg">
                <Upload className="h-3.5 w-3.5" /> Choose Image
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

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
