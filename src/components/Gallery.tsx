'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { MonthlyDate, MonthStatus } from '@/types/monthlyDate';
import { getMonthStatus } from '@/utils/monthUtils';
import CountdownTimer from './CountdownTimer';
import { getImageForMission } from '@/utils/storage';

type GalleryProps = {
  selectedMonth: MonthlyDate | null;
};

export default function Gallery({ selectedMonth }: GalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedMonth]);

  // Listen for image updates
  useEffect(() => {
    const handleImageUpdate = () => {
      setRefreshKey((prev) => prev + 1);
    };
    window.addEventListener('imageUpdated', handleImageUpdate);
    return () => window.removeEventListener('imageUpdated', handleImageUpdate);
  }, []);

  if (!selectedMonth) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="mx-auto mb-4 text-6xl">💕</div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Válassz egy hónapot…
          </p>
        </div>
      </div>
    );
  }

  const status = getMonthStatus(selectedMonth);

  // If month is locked or current but not yet available
  if (status === 'locked') {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <CountdownTimer targetDate={selectedMonth.availableFrom} />
      </div>
    );
  }

  // Recalculate images when month or refreshKey changes
  // refreshKey forces re-read from localStorage when images are updated
  const images = useMemo(() => {
    return selectedMonth.missions
      .map((mission) => getImageForMission(selectedMonth.month, mission.id))
      .filter((url): url is string => Boolean(url));
  }, [selectedMonth, refreshKey]);
  
  // Update current index if images array changes
  useEffect(() => {
    if (currentImageIndex >= images.length && images.length > 0) {
      setCurrentImageIndex(0);
    }
  }, [images.length, currentImageIndex]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="mx-auto mb-4 text-6xl">📸</div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Még nincsenek feltöltött képek
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            Tölts fel képeket a küldetésekhez lentebb
          </p>
        </div>
      </div>
    );
  }

  const hasMultipleImages = images.length > 1;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={imageUrl}
            alt={`Gallery image ${index + 1}`}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ))}

      {hasMultipleImages && (
        <>
          <button
            onClick={() =>
              setCurrentImageIndex(
                (prev) => (prev - 1 + images.length) % images.length
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
            aria-label="Előző kép"
          >
            <svg
              className="h-6 w-6 text-gray-800 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex((prev) => (prev + 1) % images.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
            aria-label="Következő kép"
          >
            <svg
              className="h-6 w-6 text-gray-800 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/50'
                }`}
                aria-label={`Ugrás a ${index + 1}. képhez`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

