interface UserData {
  email : string,
  firstName : string,
  lastName : string,
  id : string,
  phone_number : string,
  telegramConnected: string,
  channels: string[],
  favoriteChannels: string[],
  allChannels: string[],
  isEmailVerified: boolean
}

export interface UserState {
  userData: UserData | null
}

interface BotAgent {
  botName: string;
}

export interface BotAgentState {
  botAgentListData: BotAgent[] | null
}