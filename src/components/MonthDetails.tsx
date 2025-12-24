'use client';

import { MonthlyDate } from '@/types/monthlyDate';
import { getMonthStatus } from '@/utils/monthUtils';
import MissionUpload from './MissionUpload';
import { monthNames } from '@/data/monthlyDates';

type MonthDetailsProps = {
  monthData: MonthlyDate | null;
};

export default function MonthDetails({ monthData }: MonthDetailsProps) {
  if (!monthData) {
    return null;
  }

  const status = getMonthStatus(monthData);

  // Ha locked, csak a címet mutasd
  if (status === 'locked') {
    return (
      <div className="mt-12">
        <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 dark:from-gray-800 dark:to-gray-900">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            {monthNames[monthData.month - 1]} – {monthData.title}
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Ez a randi még várat magára...
          </p>
        </div>
      </div>
    );
  }

  const isDecember = monthData.month === 12;

  return (
    <div className="mt-12 space-y-8">
      {/* Description Section */}
      <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 p-8 dark:from-gray-800 dark:to-gray-900">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          {monthNames[monthData.month - 1]} – {monthData.title}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {monthData.description}
        </p>
      </div>

      {/* Missions Section */}
      {!isDecember ? (
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Küldetések
          </h3>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {monthData.missions.map((mission, index) => (
              <MissionUpload
                key={mission.id}
                month={monthData.month}
                mission={mission}
                missionNumber={index + 1}
                totalMissions={monthData.missions.length}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Zárás
          </h3>
          <MissionUpload
            month={monthData.month}
            mission={monthData.missions[0]}
            missionNumber={1}
            totalMissions={1}
          />
        </div>
      )}
    </div>
  );
}

