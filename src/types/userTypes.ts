interface UserData {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  phoneCodeHash?: string;
  lastLogin?: Date;
  picURL?: string;
  telegramSessionId?: string;
  communityConnected: {
    tg: boolean;
    discord: boolean;
  };
  isEmailVerified: boolean;
  sso: {
    google?: string;
    apple?: string;
    twitter?: string;
  };
  isChannelSelected: boolean;
  role: 'user' | 'client' | 'admin';
  referralCode?: string;
  referralUrl?: string;
  isActive: boolean;
  isDeleted: boolean;
  // Frontend-only derived fields (if still needed)
  channels?: string[];
  favoriteChannels?: string[];
  allChannels?: string[];
}

export interface UserState {
  userData: UserData | null;
}

interface BotAgent {
  botName: string;
  _id?: string;
}

interface CommunityAndChannel {
  description?: string;
  id?: string;
  participantsCount?: string;
  title?: string;
  type?: string;
}

export interface BotAgentState {
  botAgentListData: BotAgent[] | null;
  botDetailData: {
    botName: string;
  } | null;
  channelAndCommunitiesList: CommunityAndChannel[] | null;
}
