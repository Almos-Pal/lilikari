import { MonthlyDate, MonthStatus } from '@/types/monthlyDate';

export const getMonthStatus = (monthData: MonthlyDate): MonthStatus => {
  const now = new Date();
  const availableFrom = new Date(monthData.availableFrom);
  
  // Set time to start of day for comparison
  now.setHours(0, 0, 0, 0);
  availableFrom.setHours(0, 0, 0, 0);
  
  if (now < availableFrom) {
    return 'locked';
  }
  
  // Check if we're in the same month
  const currentMonth = now.getMonth() + 1;
  if (currentMonth === monthData.month && now.getFullYear() === availableFrom.getFullYear()) {
    return 'current';
  }
  
  return 'completed';
};

export const getStatusIcon = (status: MonthStatus): string => {
  switch (status) {
    case 'locked':
      return '🔒';
    case 'current':
      return '⏳';
    case 'completed':
      return '❤️';
  }
};

export const calculateTimeUntil = (targetDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
};

