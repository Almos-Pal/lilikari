"use client";
import React, { useState } from "react";
import { monthlyDates } from "@/data/monthlyDates";
import { MonthlyDate } from "@/types/monthlyDate";
import QRCode from "react-qr-code";
export default function page() {
  const [monthData, setMonthData] = useState<MonthlyDate | null>(null);
  return (
    <div className="flex items-start gap-4 max-w-[500px] flex-wrap">
      {monthlyDates.map((month) => {
        return (
          <div key={month.month}>
            <QRCode value={month.month.toString()} size={150} />
          </div>
        );
      })}
    </div>
  );
}
