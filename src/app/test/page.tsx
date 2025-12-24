"use client";
import React, { useEffect, useState } from "react";
import { monthlyDates } from "@/data/monthlyDates";
import { MonthlyDate } from "@/types/monthlyDate";
import QRCode from "react-qr-code";
export default function page() {
  const [monthData, setMonthData] = useState<MonthlyDate | null>(null);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);
  return (
    <div className="flex items-start gap-4 max-w-[500px] flex-wrap">
      {monthlyDates.map((month) => {
        return (
          <div key={month.month}>
            <QRCode value={`${baseUrl}/month/${month.month}`} size={150} />
          </div>
        );
      })}
    </div>
  );
}
