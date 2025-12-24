"use client";

import { monthlyDates } from "@/data/monthlyDates";
import { monthNames } from "@/data/monthlyDates";
import QRCode from "react-qr-code";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QRCodesPage() {
  const router = useRouter();
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/30 dark:from-gray-900 dark:to-gray-800">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push("/")}
            className="mb-4 text-sm text-pink-600 hover:text-pink-700 dark:text-pink-400"
          >
            ⬅ Vissza a főoldalra
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Minden hónap QR-kódjai
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Nyomtasd ki vagy oszd meg ezeket a QR-kódokat
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {monthlyDates.map((month) => {
            const url = `${baseUrl}/month/${month.month}`;
            return (
              <div
                key={month.month}
                className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {monthNames[month.month - 1]}
                </h2>
                <p className="text-sm font-medium text-pink-600 dark:text-pink-400">
                  {month.title}
                </p>
                <div className="rounded-lg bg-white p-3">
                  {baseUrl && <QRCode value={url} size={150} />}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 break-all text-center">
                  {url}
                </p>
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(url, "_blank");
                    }
                  }}
                  className="rounded-lg bg-pink-600 px-4 py-2 text-sm text-white hover:bg-pink-700"
                >
                  Megnyitás
                </button>
              </div>
            );
          })}
        </div>

        {/* Print gomb */}
        <div className="mt-12 text-center">
          <button
            onClick={() => window.print()}
            className="rounded-lg bg-pink-600 px-6 py-3 text-white hover:bg-pink-700"
          >
            🖨️ Nyomtatás (minden QR-kód egy oldalon)
          </button>
        </div>
      </main>

      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
