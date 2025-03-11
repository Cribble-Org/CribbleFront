export interface GraphData {
  day: string;
  date?: string;
  totalMessages: number;
  positiveCount: number;
  negativeCount: number;
}

export interface Totals {
  totalMessages: number;
  totalPositive: number;
  totalNegative: number;
}

export interface GraphResponseData {
  graphData: GraphData[];
  totals: Totals;
}

export interface ChannelsList {
  access_hash: string;
  id: string;
  title: string;
  type: string;
  username: string;
  status: string;
  role: string[];
  favorite: boolean;
  participants: number;
  isActive: boolean
}

export interface SavedChannelParsed {
  channelId: string;
}

export interface SavedChannels extends ChannelsList, SavedChannelParsed { }

export interface ActivenessData {
  chart: {
    name: string;
    value: string;
    color: string
  }[];
  states: {
    members: number
  };
}

export interface DashboardState {
  sentimentsData: GraphResponseData | null;
  loadingSentimentsData: boolean;
  channelsList: {
    channel: ChannelsList[];
    community: ChannelsList[];
  };
  allChannels: ChannelsList[];
  channelLoading: boolean;
  channelLoadingTable: boolean;
  savedChannels: SavedChannels[];
  activenessData: ActivenessData[];
  loadingActiveness: boolean;
  dashboardDateRange: DateRangeType[];
  selectedCommunities: string[]
}

export interface SentimentsAPIFilters {
  channelIds?: string[],
  startDate?: string | Date,
  endDate?: string | Date,
}

export interface DateRangeType {
  startDate: Date,
  endDate: Date,
  key: string
}