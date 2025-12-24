'use client';

import Link from 'next/link';
import { MonthlyDate } from '@/types/monthlyDate';
import { getMonthStatus, getStatusIcon } from '@/utils/monthUtils';
import { monthNames } from '@/data/monthlyDates';

type MonthCardProps = {
  monthData: MonthlyDate;
  isSelected: boolean;
  onClick: () => void;
};

export default function MonthCard({
  monthData,
  isSelected,
  onClick,
}: MonthCardProps) {
  const status = getMonthStatus(monthData);
  const icon = getStatusIcon(status);

  return (
    <Link href={`/month/${monthData.month}`} onClick={onClick}>
      <div
        className={`group relative overflow-hidden rounded-xl border-2 p-6 text-left transition-all duration-200 cursor-pointer ${
          isSelected
            ? 'border-pink-500 bg-pink-50 shadow-lg dark:border-pink-400 dark:bg-pink-900/20'
            : status === 'locked'
              ? 'border-gray-200 bg-gray-50 opacity-60 dark:border-gray-700 dark:bg-gray-800'
              : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-pink-500'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl">{icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {monthNames[monthData.month - 1]}
              </h3>
            </div>
            <p className="text-sm font-medium text-pink-600 dark:text-pink-400">
              {monthData.title}
            </p>
            {status !== 'locked' && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {monthData.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

