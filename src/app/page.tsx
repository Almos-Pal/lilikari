'use client';

import { useState } from 'react';
import Link from 'next/link';
import { monthlyDates } from '@/data/monthlyDates';
import { MonthlyDate } from '@/types/monthlyDate';
import Gallery from '@/components/Gallery';
import MonthCard from '@/components/MonthCard';
import MonthDetails from '@/components/MonthDetails';

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState<MonthlyDate | null>(
    monthlyDates[0] // Default to first month
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/30 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-gray-100 sm:text-6xl">
            Lili éves randijai
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 sm:text-2xl">
            Egy év, tizenkét randi, megszámlálhatatlan emlék.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Central Gallery */}
        <div className="mb-12">
          <Gallery selectedMonth={selectedMonth} />
        </div>

        {/* Month Cards Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {monthlyDates.map((monthData) => (
              <MonthCard
                key={monthData.month}
                monthData={monthData}
                isSelected={selectedMonth?.month === monthData.month}
                onClick={() => setSelectedMonth(monthData)}
              />
            ))}
          </div>
        </div>

        {/* Month Details */}
        <MonthDetails monthData={selectedMonth} />
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-gray-600 dark:text-gray-400 sm:px-6 lg:px-8">
          <p>Made with ❤️</p>
          <Link
            href="/qr-codes"
            className="mt-4 inline-block text-sm text-pink-600 hover:text-pink-700 dark:text-pink-400"
          >
            QR-kódok megtekintése
          </Link>
        </div>
      </footer>
    </div>
  );
}
