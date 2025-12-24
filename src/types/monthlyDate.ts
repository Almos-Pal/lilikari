export type Mission = {
  id: number;
  text: string;
  imageUrl?: string;
};

export type MonthlyDate = {
  month: number; // 1-12
  title: string;
  subtitle: string;
  description: string;
  availableFrom: Date;
  missions: Mission[];
};

export type MonthStatus = 'locked' | 'current' | 'completed';

