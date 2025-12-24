// Storage utilities for saving uploaded images (Vercel Blob Storage + localStorage cache)

const STORAGE_KEY = "lilikari_uploads";

export type UploadedImages = Record<string, Record<number, string>>; // month -> missionId -> imageUrl

// Load image URLs from localStorage cache
export const loadUploadedImages = (): UploadedImages => {
  if (typeof window === "undefined") return {};

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Save image to Vercel Blob Storage and cache URL in localStorage
export const saveUploadedImage = async (
  month: number,
  missionId: number,
  file: File
): Promise<string> => {
  if (typeof window === "undefined") throw new Error("Cannot save on server");

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("month", month.toString());
    formData.append("missionId", missionId.toString());

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      const errorMessage =
        errorData.details ||
        errorData.error ||
        `Upload failed with status ${response.status}`;
      console.error("Upload API error:", errorMessage);
      throw new Error(errorMessage);
    }

    const { url } = await response.json();

    // Cache the URL in localStorage
    const images = loadUploadedImages();
    if (!images[month]) {
      images[month] = {};
    }
    images[month][missionId] = url;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));

    return url;
  } catch (error) {
    console.error("Failed to save image:", error);
    throw error;
  }
};

// Delete image from Vercel Blob Storage and remove from cache
export const deleteUploadedImage = async (
  month: number,
  missionId: number,
  imageUrl: string
): Promise<void> => {
  if (typeof window === "undefined") return;

  try {
    // Delete from Vercel Blob Storage
    await fetch("/api/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: imageUrl }),
    });

    // Remove from localStorage cache
    const images = loadUploadedImages();
    if (images[month]) {
      delete images[month][missionId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    }
  } catch (error) {
    console.error("Failed to delete image:", error);
  }
};

// Get cached image URL for mission
export const getImageForMission = (
  month: number,
  missionId: number
): string | undefined => {
  const images = loadUploadedImages();
  return images[month]?.[missionId];
};
