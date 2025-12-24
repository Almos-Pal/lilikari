'use client';

import { useEffect, useState } from 'react';
import { calculateTimeUntil } from '@/utils/monthUtils';

type CountdownTimerProps = {
  targetDate: Date;
};

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeUntil(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeUntil(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Ez a randi még várat magára.
      </p>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="flex flex-col">
          <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">nap</div>
        </div>
        <div className="flex flex-col">
          <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">óra</div>
        </div>
        <div className="flex flex-col">
          <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">perc</div>
        </div>
        <div className="flex flex-col">
          <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">másodperc</div>
        </div>
      </div>
    </div>
  );
}

