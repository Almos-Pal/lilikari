"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { monthlyDates } from "@/data/monthlyDates";
import { MonthlyDate } from "@/types/monthlyDate";
import Gallery from "@/components/Gallery";
import MonthDetails from "@/components/MonthDetails";
import QRCode from "react-qr-code";

export default function MonthPage() {
  const params = useParams();
  const router = useRouter();
  const monthNumber = parseInt(params.monthNumber as string, 10);
  const [monthData, setMonthData] = useState<MonthlyDate | null>(null);
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const month = monthlyDates.find((m) => m.month === monthNumber);
    if (month) {
      setMonthData(month);
      if (typeof window !== "undefined") {
        setQrUrl(window.location.href);
      }
    } else {
      router.push("/");
    }
  }, [monthNumber, router]);

  if (!monthData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Betöltés...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/30 dark:from-gray-900 dark:to-gray-800">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8">
          <button
            onClick={() => router.push("/")}
            className="mb-4 text-sm text-pink-600 hover:text-pink-700 dark:text-pink-400"
          >
            ⬅ Vissza a főoldalra
          </button>
          <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl">
            Lili éves randijai
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Egy év, tizenkét randi, megszámlálhatatlan emlék.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Gallery selectedMonth={monthData} />
        </div>

        {/* QR-kód megjelenítése */}
        <div className="mb-12 flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            QR-kód megosztáshoz
          </h2>
          <div className="rounded-lg bg-white p-4">
            {qrUrl && <QRCode value={qrUrl} size={200} />}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ezt a QR-kódot szkennelheted, hogy megoszd ezt a hónapot
          </p>
        </div>

        <MonthDetails monthData={monthData} />
      </main>
    </div>
  );
}
