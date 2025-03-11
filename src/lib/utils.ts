import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { GraphData, SentimentsAPIFilters } from '../types/dashboardTypes';
import { COLORS_WITH_NAMES } from '../constants/constants';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSentimentsAverage(graphData: GraphData[]): number {
  if (!graphData || graphData.length === 0) return 0;

  const totalPositivePercentage = graphData.reduce((sum, data) => {
    const positivePercentage = data.totalMessages > 0
      ? (data.positiveCount / data.totalMessages) * 100
      : 0;
    return sum + positivePercentage;
  }, 0);

  return parseFloat((totalPositivePercentage / graphData.length).toFixed(2));
}


export function calculateTotalMembers(userCounts: { [key: string]: number }): number {
  return Object.values(userCounts).reduce((acc, value) => acc + value, 0);
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getColorByName(name: string) {
  const colorObj = COLORS_WITH_NAMES.find(color => color.name.toLowerCase() === name.toLowerCase());
  return colorObj ? colorObj.code : "#000000";
};

const formatDate = (date: string) => {
  if (typeof date === "string") {
    const parsedDate = new Date(date);
    // Ensure it's a valid date
    return !isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : date;
  }
  return date;
};

export const getQueryParams = (params?: SentimentsAPIFilters): Record<string, string> | undefined => {
  if (!params) return undefined;

  const queryParams: Record<string, string> = {};
  if (params.channelIds?.length) {
    queryParams.channelIds = params.channelIds.join(",");
  }
  if (params.startDate) {
    queryParams.startDate = formatDate(params.startDate.toString());
  }
  if (params.endDate) {
    queryParams.endDate = formatDate(params.endDate.toString());
  }

  return Object.keys(queryParams).length ? queryParams : undefined;
};

export const getDefaultDates = () => {
  const today = new Date();

  // Get 7 days Earlier date
  const sevenDaysEarlier = new Date();
  sevenDaysEarlier.setDate(today.getDate() - 7);

  // Get the previous date
  const previousDate = new Date();
  previousDate.setDate(today.getDate() - 1);

  return { sevenDaysEarlier, previousDate }
}