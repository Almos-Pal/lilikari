'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Mission } from '@/types/monthlyDate';
import { deleteUploadedImage, getImageForMission, saveUploadedImage } from '@/utils/storage';

type MissionUploadProps = {
  month: number;
  mission: Mission;
  missionNumber: number;
  totalMissions: number;
};

export default function MissionUpload({
  month,
  mission,
  missionNumber,
  totalMissions,
}: MissionUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    () => getImageForMission(month, mission.id) || mission.imageUrl
  );

  // Listen for image updates to refresh if another component updates this mission
  useEffect(() => {
    const handleImageUpdate = () => {
      const stored = getImageForMission(month, mission.id);
      if (stored) {
        setImageUrl(stored);
      }
    };
    window.addEventListener('imageUpdated', handleImageUpdate);
    return () => window.removeEventListener('imageUpdated', handleImageUpdate);
  }, [month, mission.id]);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image file
    if (!file.type.startsWith('image/')) {
      alert('Kérlek, csak képet tölts fel!');
      return;
    }

    try {
      // Convert to base64 and save
      const base64 = await saveUploadedImage(month, mission.id, file);
      setImageUrl(base64);
      // Trigger a custom event to refresh gallery
      window.dispatchEvent(new CustomEvent('imageUpdated'));
    } catch (error) {
      alert('Hiba történt a kép feltöltésekor. Kérlek próbáld újra!');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!imageUrl) return;
    
    if (confirm('Biztosan törölni szeretnéd ezt a képet?')) {
      try {
        await deleteUploadedImage(month, mission.id, imageUrl);
        setImageUrl(undefined);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        // Trigger a custom event to refresh gallery
        window.dispatchEvent(new CustomEvent('imageUpdated'));
      } catch (error) {
        alert('Hiba történt a kép törlésekor. Kérlek próbáld újra!');
        console.error(error);
      }
    }
  };

  const handleClick = () => {
    if (!imageUrl) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-sm font-semibold text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
          {missionNumber} / {totalMissions}
        </span>
        <p className="text-gray-700 dark:text-gray-300">{mission.text}</p>
      </div>

      <div
        className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700"
        onClick={handleClick}
      >
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={mission.text}
              fill
              className="object-cover"
              unoptimized
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white shadow-lg hover:bg-red-600"
              aria-label="Kép törlése"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Kattints a kép feltöltéséhez
              </p>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
    </div>
  );
}

