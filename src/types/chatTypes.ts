import { AI_BOT_URL } from './../constants/constants';

export interface Message {
  _id: string;
  messageId: string;
  username: string;
  message: string;
  sentiment: "positive" | "negative";
  createdAt: string;
  content: string;
  __v: number;
}

export interface ChatData {
  id: string;
  title: string;
  participants: number;
  type: "channel" | "community" | typeof AI_BOT_URL;
  isActive: boolean;
  messages: Message[];
  channelId: string;
  chatType: string;
  chatId: string
}

export interface ChatType {
  channelName: string;
  _id: string;
  channelId: string;
  type: string;
  chatType: string;
  messages: Message[];
}

export interface ChatState {
  chatList: ChatData[]
  chatHistory: ChatType[]
} 