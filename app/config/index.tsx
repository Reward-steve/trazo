import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function extractPublicId(url: string): string | null {
  return url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/)?.[1] ?? null;
}

export async function deleteCloudinaryImage(
  imageUrl: string | null | undefined,
) {
  if (!imageUrl) return;
  const publicId = extractPublicId(imageUrl);
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete failed:", publicId, err);
  }
}

export { cloudinary };
